import { CryptrConfig } from "./interfaces";

export const genIss = (domain: string, issuer: string): string => {
  let lastPath = `/t/${domain}`;
  return issuer && issuer.endsWith(lastPath) ? issuer : `${issuer}${lastPath}`;
};

export const claimsErrors = (
  claims: object,
  cryptrConfig: CryptrConfig
): object => {
  const { audiences, client_ids, issuer, tenants } = cryptrConfig;
  const [aud, jtt, version] = [
    claims["aud"],
    claims["jtt"],
    getClaimsVersion(claims),
  ];
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

export const getClaimsVersion = (claims: object): number => {
  return claims["ver"] || -1;
};

export const getClaimsDomain = (claims: object): string | undefined => {
  return claims["ver"] == 3 ? claims["org"] : claims["tnt"];
};
