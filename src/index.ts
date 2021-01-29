import jwksClient from "jwks-rsa";
import jwtDecode from "jwt-decode";
import nJwt from "njwt";

import { validIssuer } from "@cryptr/cryptr-config-validation";
import { CryptrConfig, CryptrOptions, VerifyError } from "./interfaces";
import { DEFAULT_OPTS, SIGNING_ALG } from "./defaults";

const claimsErrors = (claims: any, cryptrConfig: CryptrConfig) => {
  return {
    "issuer": claims["iss"] === cryptrConfig.issuer,
    "audiences": cryptrConfig.audiences.includes(claims["aud"]),
    "tenants": cryptrConfig.tenants.includes(claims["tnt"])
  }
}
class CryptrJwtVerifier {
  cryptrConfig: CryptrConfig;
  jwksUri: string;
  jwksClient;
  cryptrOpts;

  constructor(cryptrConfig: CryptrConfig, opts: CryptrOptions = DEFAULT_OPTS) {
    if (!opts.test) {
      validIssuer(cryptrConfig.issuer);
    }
    this.cryptrOpts = opts;
    this.cryptrConfig = cryptrConfig;
    this.jwksUri = `${cryptrConfig.issuer}/.well-known`;

    this.jwksClient = jwksClient({
      jwksUri: this.jwksUri,
      cache: true,
      cacheMaxAge: cryptrConfig.cacheMaxAge || 60 * 60 * 1000,
      cacheMaxEntries: 3,
      jwksRequestsPerMinute: cryptrConfig.jwksRequestsPerMinute || 10,
      rateLimit: true,
    });
  }

  getKid(token: string) {
    const decode: object = jwtDecode(token, { header: true });
    return decode["kid"];
  }

  async getPublicKey(kid: string) {
    return new Promise((resolve, reject) => {
      this.jwksClient.getSigningKey(kid, (err, key: any) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(key["publicKey"]);
        }
      });
    });
  }

  handleVerifyError(reject, error: VerifyError) {
    this.handleVerifyErrorMessage(reject, error.message)
  }

  handleVerifyErrorMessage(reject, msg: string) {
    reject({valid: false, errors: msg})
  }

  async verify(token: string) {

    return new Promise((resolve, reject) => {
      try{
        const kid = this.getKid(token);
        this.getPublicKey(kid)
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
                  let keysToCheck : String[] = []
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
      }catch(err){
        this.handleVerifyError(reject, err)
      }
    });
  }
}

export default CryptrJwtVerifier;