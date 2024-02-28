export interface CryptrConfig {
  audiences: string[];
  client_ids: string[];
  issuer: string;
  tenants: string[];
  cacheMaxAge?: number;
  jwksRequestsPerMinute?: number;
}

export interface CryptrOptions {
  test: boolean;
}

export interface VerifyError {
  message: string;
}

export type RejectCallback = (reason?: unknown) => void;
export type ResolveCallback = (value: unknown) => void;
