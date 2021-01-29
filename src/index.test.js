import CryptrJwtVerifier from "./index.ts";
import {DEFAULT_OPTS} from "./defaults";

const CONFIG = {
  audiences: ["http://localhost:4200"],
  issuer: "http://localhost:4000/t/shark-academy",
  tenants: ["shark-academy"]
};

const SECOND_CONFIG = {
  audiences: ["http://localhost:4200"],
  issuer: "http://localhost:4000/t/shark-academy",
  tenants: ["cryptr"]
};

const SECURE_CONFIG = {
  audiences: ["https://localhost:3001"],
  issuer: "https://localhost:4000/t/shark-academy",
  tenants: ["shark-academy"]
};

const WRONG_CONFIG = {
  audiences: ["https://localhost:3001"],
  issuer: "https://localhost:4000/t/shark-academy"
};

const cryptrJwtVerifier = new CryptrJwtVerifier(CONFIG, { test: true });
const secondCryptrJwtVerifier = new CryptrJwtVerifier(SECOND_CONFIG, { test: true });
const noOptsCryptrJwtVerifier = new CryptrJwtVerifier(SECURE_CONFIG);
const wrongCryptrJwtVerifier = new CryptrJwtVerifier(WRONG_CONFIG);

const VALID_ACCESS_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90L3NoYXJrLWFjYWRlbXkiLCJraWQiOiI5ZjhlNTE1MC1lNWIxLTQ4MWEtOTAyNS1mYzc2YmQ1Y2JlYmUiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAiLCJjaWQiOiI3MjRiMTQxYS1lMWViLTRmNWItYmZjYS0yMmVjYThhZTNjYzQiLCJleHAiOjE2MTExNTc1NDUzOTksImlhdCI6MTYxMTE1NjY0NTM5OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3Qvc2hhcmstYWNhZGVteSIsImp0aSI6IjY4ZmI4ZjUwLWE1OGQtNDhlNC04Y2RhLWQwY2ZiODU0MDcwOCIsImp0dCI6ImFjY2VzcyIsInJlc291cmNlX293bmVyX21ldGFkYXRhIjp7fSwic2NwIjpbImxpbWl0ZWQiXSwic3ViIjoiZWJhMjU1MTEtYWZjZS00YzhlLThjYWItZjgyODIyNDM0NjQ4IiwidG50Ijoic2hhcmstYWNhZGVteSIsInZlciI6MX0.J9selW7sIM_5QuT80RpeOcRGkgeVARFnph6QlPfxGYiv_SgmmOpbXZahlrdFvJTRMGsR4lLkkPwfYH-AJSwKyH9cnvrDqoRUWk_c98RWwBB_zCZcgbPbBE95tzzEumLFoRjNznCb6B5t6_Kf1-iKi9g2xqr_AvgNYsamGcYKCNDF6w16PpzN8vRKjE9hiZj9bsB7ZEHYshLv404NBsyA3k2w6Ufn6LoSf2SXMthXL-ZHWn-NUfbUdgtapaydLqBUOSbhnA3X0QGv4BPdxyWmii8PFicilLv-OwaBPN6rS49n9xC_Dq42Lq7IOR3NyNka3vzBLZRcHev1g8SsPtoizJUlk0TBvWVwPujWsOEgxon54i4YSbW_mWkCNhLfPkYrWIGSPt8k8R0DQMIuEQcrUwO0fyl01UDUSBYxZ7nK-htA_1v5SkkPB3b0cWPmhzyGaGk5LOcW3JCwEOkr5TxMg8XkId6-GulEseUnTeGsV1hlpG3dmE_C1WqHPxelwbFGsIZvwgAO5wPWne9YtPXrxQVG4ippZjnPyRrlL3J2pvIs0dLj16xK-Xm3TndoQMB_jKwQv4Klji_sNAonPjm218YCnKCb308_5FlU1Q_s7husCVZE7lRlYmdX-4y2GwTuZBiPIXJM82osI6wVU-KC0XeTSFsNMzyX594nuG9bf5A";
const OLD_ACCESS_TOKEN = 
  "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90L3NoYXJrLWFjYWRlbXkiLCJraWQiOiJlYTE2NzI1ZS1jYTAwLTQxN2QtOTRmZS1hNzBiMTFhMGU0OTMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDEiLCJjaWQiOiIzMWFlMDI0OC1lZTdmLTQxODktYWMwYy0xNDg0NGJiNjEzYzQiLCJleHAiOjE2MDIyNjM0NjQsImlhdCI6MTYwMjI1MzQ2NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3Qvc2hhcmstYWNhZGVteSIsImp0aSI6IjY0NmQ0MGUwLTlmY2YtNDEyMy1hYmYyLWIwYWM2NmM1ODkyNCIsImp0dCI6ImFjY2VzcyIsInJlc291cmNlX293bmVyX21ldGFkYXRhIjp7fSwic2NwIjpbIm9wZW5pZCIsImVtYWlsIl0sInN1YiI6IjllYzVhYWE4LTM4MWUtNDY1Zi04MzIxLTM2ZTE0YzVlMWVlNyIsInRudCI6InNoYXJrLWFjYWRlbXkiLCJ2ZXIiOjF9.WnXc0IVyz5jP7xfEuE4LFenln31JlsGswjpiu-It1EEeGLnTFQ96I2jAyZ_UWHnJpmr0PuoCeFyAOYfjrjWt90XE-aFgV-Z3EUMsH1TDo6jIwrxahEksIuLr6HZeI7E52Sse7K4LOmV-UKgxkWlhO0_cRT7eABbuVEvx0zLwMxKwbKHmeQ9HVFkrXs-JcSMmg6yBJYyvFVejVbSXAPDyp37JlOEYfw-wb_pPEoVvejZk-D9-82tkJLzFfOI5MktruQ8AKu4NUQNbbwsfubXExnWyPj6dOuo1W6NipODQ-IV8djw-1xxrSVNghdbsvA6TwMH2aQA1K_N1dRZMrJ6LZ5QlMsonyjT3SDrDyETaBeOKvJvFLFr0AbXQS-juY6QrtPJmswDWXN7vq0GL-9isg288G2--V1U1Z68raADsiHMtIErPwcqBMnBauACPSqFqXC6Gv5hE7JG0YCihBYn1QYPO7mWml8n2Te_QiqRFVgIwl2lgr6-ouHCX5a6HeSr_W7lXN_5dlrevAkr3alaloIY2qerR3weW8xFnL9PWglSiDRYEQhTI-_2sbjRJHpNtmJyehnxg5tSWqicX1rm8CLTiMHtkqrY2PJHP9qD7ZogIKGzcRhHaXdkA9BuIknFxAsDPjEX6gkpg_YgtLFWZ2bKxLWG5J9Kv_UnSLjd_9jc";
const INVALID_ACCESS_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90L21pc2FwcmV0Iiwia2lkIjoiY2VjYzcyY2ItZGMzZS00OGY2LTk0OWEtN2ZmZjFhN2VjNWFiIiwidHlwIjoiSldUIn0.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJjaWQiOiI4NDYwZGJkMS0yOGM2LTQ3N2ItOTg5YS1iNzFiODUwYzI5NmQiLCJleHAiOjQxNDYzMTU4ODk3MzEsImlzcyI6Im1pc2FwcmV0Lmh0dHA6Ly9sb2NhbGhvc3Q6NDAwMCIsImp0aSI6IjM0YjAwOTgzLWFkNmMtNDhkYi04N2U3LWNhZjBlYmM5YjhhNyIsImp0dCI6ImFjY2VzcyIsInNjcCI6WyJvcGVuaWQiLCJlbWFpbCJdLCJzdWIiOiI5ZWM1YWFhOC0zODFlLTQ2NWYtODMyMS0zNmUxNGM1ZTFlZTciLCJ0bnQiOiJtaXNhcHJldCIsInZlciI6MX0.qrd3yoEJYJ8LtyS9A_lJtZ89pSKCQIOWUgd40Tm_M_99SJHTmSMEoIgsbrUM94j_FCrZLe2omsOcPR6mfbRJFevlXQe6yzsE9ROsHGgI-E44AcDLjDN5y3Mri2VfYnaOuVhtb6ubZuAwqzuVnxkNIiEEhlwnshIyVUxopqpbklrQ6PN-ob7tt8x_EX8qJxm63GZYGQRSJRoPmVOARRZbpl75gYVdwL3UI9SKiBD-Um2zkJ1-eXddkXbVZkGl6Xyb9-B0-IpWeP77FP0QblFlR_atHY9jReIYAoSNzR92hWcRrUXC92g0STdH1CmLNgmamBxO9ASdsTneU4bWD_rEVmp3Yk8Uq-wlWwhFdnz9u_BPN0wLsrLUfk0aKOC14N9T9-imtl8zubR_TSqXqQXfUJ_m7omkZ2X8ZilpZWkHzsBaXOu-vvIoo2cJNX2QFl3J6WasnlSQCf3kiRJYz8_W1maiqrlWXNK2KGTxGO2_6VYYj4hMce7IlZQ2dx5G4mP511z7hIEh7Jq90-dmWjGtq9Rt91cdQ7uo5p90U4DaGKRnZU0S2XzLQcxUigKX9dsqsCeeZXVQZ_otihMzDt4SflcNvUliEV848P3WI1Y03fujCwwndY4pGrf91G8gqwhVCoFtgB_bJoOPiSFhJAzZ7twm7Hj-qf-Z7BTCrZfsaqg";

describe("new CryptrJwtVerifier(cryptrConfig)", () => {
  it("should return an instancied Verifier with a config", () => {
    expect(cryptrJwtVerifier.cryptrConfig).toMatchObject({
      audiences: ["http://localhost:4200"],
      tenants: ["shark-academy"],
      issuer: "http://localhost:4000/t/shark-academy",
    });
  });

  it("should generate a jwksUri", () => {
    expect(cryptrJwtVerifier.jwksUri).toMatch(
      "http://localhost:4000/t/shark-academy/.well-known"
    );
  });

  it("should define default opts if not defined", () => {
    expect(noOptsCryptrJwtVerifier.cryptrOpts).toEqual(DEFAULT_OPTS)
  })
});

describe("new CryptrJwtVerifier(wrong cryptrConfig)", () => {
  xit("should throw an error", () => {
    expect(wrongCryptrJwtVerifier).toMatchObject({
      audiences: ["http://localhost:4200"],
      tenants: ["shark-academy"],
      issuer: "http://localhost:4000/t/shark-academy",
    });
  });
});

describe("getKid(token)", () => {
  it("should return key identifier (kid)", () => {
    expect(cryptrJwtVerifier.getKid(VALID_ACCESS_TOKEN)).toBe(
      "9f8e5150-e5b1-481a-9025-fc76bd5cbebe"
    );
  });
});

describe("getPublicKey(kid)", () => {
  it("should return public key", async () => {
    await cryptrJwtVerifier
      .getPublicKey("9f8e5150-e5b1-481a-9025-fc76bd5cbebe")
      .then((key) => {
        expect(key).toMatch("-----BEGIN CERTIFICATE-----");
      })
      .catch((error) => {
        console.debug(error);
      });
  });
});

describe("verify(token)", () => {
  it("should valid token with decode claims", async () => {
    await cryptrJwtVerifier
      .verify(VALID_ACCESS_TOKEN)
      .then((resp) => {
        expect(resp).toEqual({
          valid: true,
          claims: {
            aud: "http://localhost:4200",
            cid: "724b141a-e1eb-4f5b-bfca-22eca8ae3cc4",
            exp: 1611157545399,
            iat: 1611156645399,
            iss: "http://localhost:4000/t/shark-academy",
            jti: "68fb8f50-a58d-48e4-8cda-d0cfb8540708",
            jtt: "access",
            resource_owner_metadata: {},
            scp: ["limited"],
            sub: "eba25511-afce-4c8e-8cab-f82822434648",
            tnt: "shark-academy",
            ver: 1,
          },
        });
      })
      .catch((resp) => {
        expect(resp).toStrictEqual({
          valid: false,
          errors: "Non-compliant claims",
        });
      });
  });
});

describe('verify(token)', () => {
  it('should unvalid token with no signing key', async () => {
    await cryptrJwtVerifier.verify(INVALID_ACCESS_TOKEN)
      .then((resp) => {
        expect(resp).toBe(false)
      })
      .catch((resp) => {
        expect(resp.valid).toEqual(false)
        expect(resp.errors).toMatch(/Unable to find a signing key that matches/)
      })
  })
})

describe('verify old token', () => {
  xit('should unvalid token with no signing key', async () => {
    await cryptrJwtVerifier.verify(OLD_ACCESS_TOKEN)
      .then((resp) => {
        expect(resp).toBe(false)
      })
      .catch((err) => {
        expect(err.valid).toEqual(false)
        expect(err.errors).toEqual("Jwt is expired")
      })
  })
})

describe('verify token with second config', () => {
  it('should fails with non conform claims', async () => {
    await secondCryptrJwtVerifier.verify(VALID_ACCESS_TOKEN)
      .then((resp) => {
        expect(resp).toBe(false)
      })
      .catch((resp) => {
        expect(resp.valid).toEqual(false)
        expect(resp.errors).toStrictEqual("Non-compliant claims, please check tenants")
      })
  })
})

describe('verify token is null', () => {
  it('should unvalid token if null', async () => {
    await cryptrJwtVerifier.verify(null)
      .then((resp) => {
        expect(resp).toBe(false)
      })
      .catch((resp) => {
        expect(resp.valid).toEqual(false)
        expect(resp.errors).toEqual("Invalid token specified")
      })
  })
})
