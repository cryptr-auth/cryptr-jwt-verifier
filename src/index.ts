import jwksClient, { CertSigningKey, SigningKey } from "jwks-rsa";
import jwtDecode from "jwt-decode";
import nJwt, { Jwt } from "njwt";

import { validIssuer } from "@cryptr/cryptr-config-validation";
import {
  CryptrConfig,
  CryptrOptions,
  RejectCallback,
  ResolveCallback,
  VerifyError,
} from "./interfaces";
import { DEFAULT_OPTS, SIGNING_ALG } from "./defaults";

const genIss = (tnt: string, issuer: string): string => {
  return `${issuer}/t/${tnt}`;
};

const claimsErrors = (claims: object, cryptrConfig: CryptrConfig): object => {
  const { audiences, client_ids, issuer, tenants } = cryptrConfig;
  const [aud, jtt, version] = [claims["aud"], claims["jtt"], claims["ver"]];
  const isV3 = version == 3;
  const isIDV3 = isV3 && jtt == "openid";

  const tokenDomain = isV3 ? claims["org"] : claims["tnt"];
  const validAudience = isIDV3
    ? client_ids.includes(aud)
    : audiences.includes(aud);
  return {
    issuer: isV3 || claims["iss"] === genIss(claims["tnt"], issuer),
    client_ids: isV3 || client_ids.includes(claims["cid"]),
    audiences: validAudience,
    tenants: tenants.includes(tokenDomain),
  };
};
class CryptrJwtVerifier {
  cryptrConfig: CryptrConfig;
  jwksUri: string;
  cryptrOpts;

  constructor(cryptrConfig: CryptrConfig, opts: CryptrOptions = DEFAULT_OPTS) {
    if (!opts.test) {
      validIssuer(cryptrConfig.issuer);
    }
    this.cryptrOpts = opts;
    this.cryptrConfig = cryptrConfig;
    this.jwksUri = `${cryptrConfig.issuer}/.well-known`;
  }

  getKid(token: string): string | never {
    const decode: object = jwtDecode(token, { header: true });
    return decode["kid"];
  }

  getTnt(token: string): string | undefined {
    const decode: object = jwtDecode(token);
    return decode["tnt"];
  }

  async getPublicKey(tnt: string, kid: string): Promise<SigningKey> {
    let jwksUri = `${genIss(tnt, this.cryptrConfig.issuer)}/.well-known`;
    let client = jwksClient({
      jwksUri: jwksUri,
      cache: true,
      cacheMaxAge: this.cryptrConfig.cacheMaxAge ?? 60 * 60 * 1000,
      cacheMaxEntries: 3,
      jwksRequestsPerMinute: this.cryptrConfig.jwksRequestsPerMinute ?? 10,
      rateLimit: true,
    });
    return new Promise((resolve, reject) => {
      client.getSigningKey(kid, (err, key?: SigningKey) => {
        if (key) {
          return resolve(key["publicKey"]);
        } else {
          return reject(err);
        }
      });
    });
  }

  handleVerifyError(reject: RejectCallback, error: VerifyError): void {
    this.handleVerifyErrorMessage(reject, error.message);
  }

  handleVerifyErrorMessage(reject: RejectCallback, msg: string): void {
    reject({ valid: false, errors: msg });
  }

  handleVerifySuccess(
    verifiedJwt: Jwt,
    resolve: ResolveCallback,
    reject: RejectCallback
  ): void {
    const jwtBody = verifiedJwt["body"];

    const errorClaims = claimsErrors(jwtBody, this.cryptrConfig);
    const validClaims = Object.values(errorClaims).every((item) => item);

    if (validClaims) {
      return resolve({ valid: true, claims: jwtBody });
    } else {
      const keysToCheck: string[] = [];
      Object.keys(errorClaims).forEach((k) => {
        if (!errorClaims[k]) {
          keysToCheck.push(k);
        }
      });
      return this.handleVerifyErrorMessage(
        reject,
        `Non-compliant claims,\nplease check ${keysToCheck.join(", ")}`
      );
    }
  }

  verifyTokenWithKey(
    token: string,
    publicKey: string | Buffer | undefined,
    resolve: ResolveCallback,
    reject: RejectCallback
  ) {
    try {
      const verifiedJwt = nJwt.verify(token, publicKey, SIGNING_ALG);
      if (verifiedJwt !== undefined) {
        return this.handleVerifySuccess(verifiedJwt, resolve, reject);
      } else {
        return this.handleVerifyErrorMessage(reject, "unable to verify token");
      }
    } catch (error) {
      return this.handleVerifyError(reject, error as VerifyError);
    }
  }

  async verify(token: string): Promise<unknown> {
    return new Promise((resolve: ResolveCallback, reject: RejectCallback) => {
      try {
        const kid = this.getKid(token)!;
        const tnt = this.getTnt(token)!;

        this.getPublicKey(tnt, kid)
          .then((publicKey) => {
            this.verifyTokenWithKey(
              token,
              (publicKey as CertSigningKey).toString(),
              resolve,
              reject
            );
          })
          .catch((err) => {
            this.handleVerifyError(reject, err);
          });
      } catch (err) {
        this.handleVerifyError(reject, err as VerifyError);
      }
    });
  }
}

export default CryptrJwtVerifier;
