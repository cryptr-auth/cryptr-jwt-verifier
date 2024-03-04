let CryptrJwtVerifier = require('../dist/index')
require('dotenv').config()
const arrayEnv = (envValue) => {
  return envValue.split(" ")
}

const CONFIG = {
  audiences: arrayEnv(process.env.CRYPTR_AUDIENCES),
  client_ids: arrayEnv(process.env.CRYPTR_CLIENT_IDS),
  issuer: process.env.CRYPTR_ISSUER,
  tenants: arrayEnv(process.env.CRYPTR_TENANTS)
};

let verifier =  new CryptrJwtVerifier.default(CONFIG);
let token1 = process.env.CRYPTR_TOKEN_1
let token2 = process.env.CRYPTR_TOKEN_2
verifier
  .verify(token1)
  .then((resp) => {
    console.debug('token1', resp)
  })
  .catch((error) => {
    console.error('token1', error)
  });



verifier
  .verify(token2)
  .then((resp) => {
    console.debug('token 2', resp)
  })
  .catch((error) => {
    console.error('token 2 err', error)
  });



