import jwksClient from "jwks-rsa";
import jwtDecode from "jwt-decode";
import nJwt from "njwt";

import { validIssuer } from "@cryptr/cryptr-config-validation";
import { CryptrConfig, CryptrOptions, VerifyError } from "./interfaces";
import { DEFAULT_OPTS, SIGNING_ALG } from "./defaults";

const genIss = (tnt: string, issuer: string): string => {
  return `${issuer}/t/${tnt}`
}

const claimsErrors = (claims: any, cryptrConfig: CryptrConfig): object => {
  return {
    "issuer": claims["iss"] === genIss(claims["tnt"], cryptrConfig.issuer),
    "client_id": claims["cid"] === cryptrConfig.client_id,
    "audiences": cryptrConfig.audiences.includes(claims["aud"]),
    "tenants": cryptrConfig.tenants.includes(claims["tnt"])
  }
}
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

  getKid(token: string): string | undefined {
    const decode: object = jwtDecode(token, { header: true });
    return decode["kid"];
  }
  
  getTnt(token: string) : string | undefined {
    const decode: object = jwtDecode(token);
    return decode["tnt"];
  }

  async getPublicKey(tnt: string, kid: string): Promise<unknown> {
    let jwksUri = `${genIss(tnt, this.cryptrConfig.issuer)}/.well-known`;
    let client = jwksClient({
      jwksUri: jwksUri,
      cache: true,
      cacheMaxAge: this.cryptrConfig.cacheMaxAge ?? 60 * 60 * 1000,
      cacheMaxEntries: 3,
      jwksRequestsPerMinute: this.cryptrConfig.jwksRequestsPerMinute ?? 10,
      rateLimit: true,
    })
    return new Promise((resolve, reject) => {
      client.getSigningKey(kid, (err, key: any) => {
        if(err) {
          return reject(err);
        } else {
          console.debug(key)
          return resolve(key["publicKey"])
        }
      })
    })
  }

  handleVerifyError(reject, error: VerifyError) {
    this.handleVerifyErrorMessage(reject, error.message)
  }

  handleVerifyErrorMessage(reject, msg: string) {
    reject({valid: false, errors: msg})
  }

  async verify(token: string): Promise<unknown> {

    return new Promise((resolve, reject) => {
      try{
        const kid = this.getKid(token)!!!;
        const tnt = this.getTnt(token)!!!;

        this.getPublicKey(tnt, kid)
          .then(publicKey => {
            nJwt.verify(token, publicKey, SIGNING_ALG, (err, verifiedJwt) => {
              if(err){
                this.handleVerifyError(reject, err)
              }else{
                const jwtBody = verifiedJwt["body"]
                const errorClaims = claimsErrors(jwtBody, this.cryptrConfig)
                const validClaims = Object.values(errorClaims).every(item => item)
                if (validClaims) {
                  resolve({
                    valid: true,
                    claims: jwtBody
                  })
                } else {
                  let keysToCheck : string[] = []
                  Object.keys(errorClaims).forEach(key => {
                    if(!errorClaims[key]) { keysToCheck.push(key)}
                  });
                  this.handleVerifyErrorMessage(reject, `Non-compliant claims, please check ${keysToCheck.join(', ')}`)
                }
              }
            });
          })
          .catch((err) => {
            this.handleVerifyError(reject, err)
          })
      } catch(err)
      {
        this.handleVerifyError(reject, err as VerifyError)
      }
    });
  }
}

export default CryptrJwtVerifier;