export interface CryptrConfig {
  audiences: string[];
  client_ids: string[];
  issuer: string;
  tenants: string[];
  cacheMaxAge?: number;
  jwksRequestsPerMinute?: number
}

export interface CryptrOptions {
  test: boolean
}

export interface VerifyError {
  message: string
}