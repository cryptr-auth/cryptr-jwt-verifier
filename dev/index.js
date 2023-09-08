// let CryptrJwtVerifier = require('@cryptr/cryptr-jwt-verifier');
let CryptrJwtVerifier = require('../dist/index')
require('dotenv').config()
const arrayEnv = (envValue) => {
  return envValue.split(" ")
}

const CONFIG = {
  audiences: arrayEnv(process.env.CRYPTR_AUDIENCES),
  client_id: process.env.CRYPTR_CLIENT_ID,
  issuer: process.env.CRYPTR_ISSUER,
  tenants: arrayEnv(process.env.CRYPTR_TENANTS)
};
let verifier =  new CryptrJwtVerifier.default(CONFIG);
let token = process.env.CRYPTR_TOKEN_1
let token2 = process.env.CRYPTR_TOKEN_2

verifier
  .verify(token)
  .then((resp) => {
    console.debug(resp)
  })
  .catch((error) => {
    console.error(error)
  });

verifier
  .verify(token2)
  .then((resp) => {
    console.debug('token 2', resp)
  })
  .catch((error) => {
    console.error('token 2', error)
  });