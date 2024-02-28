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

const claimsErrors = (claims: any, cryptrConfig: CryptrConfig): object => {
  return {
    issuer: claims["iss"] === genIss(claims["tnt"], cryptrConfig.issuer),
    client_ids: cryptrConfig.client_ids.includes(claims["cid"]),
    audiences: cryptrConfig.audiences.includes(claims["aud"]),
    tenants: cryptrConfig.tenants.includes(claims["tnt"]),
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
      client.getSigningKey(kid, (err, key: any) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(key["publicKey"]);
        }
      });
    });
  }

  handleVerifyError(reject: RejectCallback, error: any) {
    this.handleVerifyErrorMessage(reject, error.message);
  }

  handleVerifyErrorMessage(reject: RejectCallback, msg: string) {
    reject({ valid: false, errors: msg });
  }

  handleVerifySuccess(
    verifiedJwt: Jwt,
    resolve: ResolveCallback,
    reject: (reason?: any) => void
  ) {
    const jwtBody = verifiedJwt["body"];

    const errorClaims = claimsErrors(jwtBody, this.cryptrConfig);
    const validClaims = Object.values(errorClaims).every((item) => item);

    if (validClaims) {
      return resolve({ valid: true, claims: jwtBody });
    } else {
      let keysToCheck: string[] = [];
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
    reject: (reason?: any) => void
  ) {
    try {
      const verifiedJwt = nJwt.verify(token, publicKey, SIGNING_ALG);
      if (verifiedJwt !== undefined) {
        return this.handleVerifySuccess(verifiedJwt, resolve, reject);
      } else {
        return this.handleVerifyErrorMessage(reject, "unable to verify token");
      }
    } catch (error) {
      return this.handleVerifyError(reject, error);
    }
  }

  async verify(token: string): Promise<unknown> {
    return new Promise(
      (resolve: (value: any) => void, reject: (reason?: any) => void) => {
        try {
          const kid = this.getKid(token)!!!;
          const tnt = this.getTnt(token)!!!;

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
      }
    );
  }
}

export default CryptrJwtVerifier;
