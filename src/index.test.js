import CryptrJwtVerifier from "./index.ts";
import {DEFAULT_OPTS} from "./defaults";

const CONFIG = {
  audiences: ["http://localhost:8000"],
  issuer: "http://localhost:4000",
  tenants: ["communitiz-app", "3-belges"],
  client_ids: ["414bb229-66a8-4351-ad93-1309e0b07a02"]
};

const SECOND_CONFIG = {
  audiences: ["http://localhost:8000"],
  issuer: "http://localhost:4000",
  tenants: ["cryptr"],
  client_ids: ["414bb229-66a8-4351-ad93-1309e0b07a02"]
};

const SECURE_CONFIG = {
  audiences: ["https://localhost:3001"],
  issuer: "https://localhost:4000",
  tenants: ["communitiz-app"],
  client_ids: ["414bb229-66a8-4351-ad93-1309e0b07a02"]
};

const WRONG_CONFIG = {
  audiences: ["https://localhost:3001"],
  issuer: "https://localhost:4000",
  client_ids: ["414bb229-66a8-4351-ad93-1309e0b07a02"]
};

const cryptrJwtVerifier = new CryptrJwtVerifier(CONFIG, { test: true });
const secondCryptrJwtVerifier = new CryptrJwtVerifier(SECOND_CONFIG, { test: true });
const noOptsCryptrJwtVerifier = new CryptrJwtVerifier(SECURE_CONFIG);
const wrongCryptrJwtVerifier = new CryptrJwtVerifier(WRONG_CONFIG);

const VALID_ACCESS_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90LzMtYmVsZ2VzIiwia2lkIjoiOWI5NWU2YzctMTExOC00OTIwLWE4NTQtM2EyNmM4MzI2OWU5IiwidHlwIjoiSldUIn0.eyJhcHBsaWNhdGlvbl9tZXRhZGF0YSI6e30sImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCIsImNpZCI6IjQxNGJiMjI5LTY2YTgtNDM1MS1hZDkzLTEzMDllMGIwN2EwMiIsImRicyI6InNhbmRib3giLCJlbWFpbCI6InRoaWJhdWRAMy1iZWxnZXMuZnIiLCJleHAiOjE3OTc2NzgzOTYsImlhdCI6MTcwMzA3MDQzMywiaXBzIjoiY3J5cHRyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3QvMy1iZWxnZXMiLCJqdGkiOiJlYzkwM2VhOC1kMjAzLTQ3Y2QtYjdlMS02OTY1YjRlZTdlMmMiLCJqdHQiOiJhY2Nlc3MiLCJzY2kiOm51bGwsInNjcCI6WyJvcGVuaWQiLCJlbWFpbCIsInByb2ZpbGUiXSwic3ViIjoiMDgzYWQzZTEtY2QyOC00ZWUzLWE2YmQtNzU5MmJjMWQwOWVhIiwidG50IjoiMy1iZWxnZXMiLCJ2ZXIiOjF9.grqxzGUJGvzGar4Dt-FT_ZvivbgS4OO4NiDtcE47KFtXHUrkKRuUTDMyXdMXPDlx8CLIVa5XatYkPcIFzfd6k4bCV_xax0J9o0wqJM6z6WXACUBvYaUyy4dGK6KQ7xyRSsckTBipzkS_R1QKZsM2xrI455k4EYLH-sb4fUgtcY-xB7rhSEFgiy2-UUN9V01W_6WM7bLB5_GwSN5oV-evimsYmfvoK6W0z12Pjt7TcEE8Rey3ZEq3l4wVXZmVnt92SR68dF3UDc-5mPbCkbgluaT1MUF1uXXxOpjA7Nd9RZTqyVk0RM7KXzWiGE7hyf_8cOBNRtNNCFO2H2beeCDhQONoNYv1eh_4xMUtRqCZn6Z_aJk6vaEAe44ofSUxk6Ezi0yESXksrltqkiBEnz1YFHYjZ8I1IKkLXf3SnU1p8SWnbeyleeMF9JPqfdGeJuIlhTJDV95gkwmCRDuEt9OqUgTIkgXRnKpGggxq-vyEfi2nRMbL3HlrTEvwYEYAHGtU13MnQeDJ-yNif4T_zO3ztJUW_RyetZg-J-4alHhK-2v53hkeMif4a5FIVnkDYjRbL8n-uGb8f6WwmDfcXbhwFdyNZA-jOxrr3bsdzaSnUydVx1UQFYbcepHKstI9atIilevZp8P_dt3bydaadA7Xrc8lzyqtOhrCNUPiqHm-jkk";
const OLD_ACCESS_TOKEN = 
  "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90LzMtYmVsZ2VzIiwia2lkIjoiOWI5NWU2YzctMTExOC00OTIwLWE4NTQtM2EyNmM4MzI2OWU5IiwidHlwIjoiSldUIn0.eyJhcHBsaWNhdGlvbl9tZXRhZGF0YSI6e30sImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCIsImNpZCI6IjQxNGJiMjI5LTY2YTgtNDM1MS1hZDkzLTEzMDllMGIwN2EwMiIsImRicyI6InNhbmRib3giLCJlbWFpbCI6InRoaWJhdWRAMy1iZWxnZXMuZnIiLCJleHAiOjE3MDMwNzA1NTMsImlhdCI6MTcwMzA3MDU2MiwiaXBzIjoiY3J5cHRyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3QvMy1iZWxnZXMiLCJqdGkiOiJjMDNhNGRkNS0wZmE0LTQzOTQtOTg4OS1hOWJmNGYyNmQ3MTciLCJqdHQiOiJhY2Nlc3MiLCJzY2kiOm51bGwsInNjcCI6WyJvcGVuaWQiLCJlbWFpbCIsInByb2ZpbGUiXSwic3ViIjoiMDgzYWQzZTEtY2QyOC00ZWUzLWE2YmQtNzU5MmJjMWQwOWVhIiwidG50IjoiMy1iZWxnZXMiLCJ2ZXIiOjF9.YF4dBbC-reAy_X9rIreD8d8meXgk9gxdkHwanJUVixF8X_WINDwKiMYMMLhf2BxVCC3xzNbUe_ikCEzopGqmDypayxAZi6edF_-hY9pPeeXJqZWSAmoDrfoFSggAIXzd6Ju10ZslElj3Q4mqQd8GXcW4LxK_q5fUvuZeQ7n47i-IV2V0qwX7t6667-0O8Ir08sGTpz-TPbbap0lmnzDwiijHnyocmx6WYWcIiSsSLrphLxIKJH46HIrLobTzwPAWXzteiECjrlkxtuX6CcTU5DvjDIHtn6HklY_GlEvZBed3kNPo-xpnSVbRLm4FS0FaBZ58rHNDNn0Wca2vcVEriJYpy9JPndeTNA_-fUxiNmqlYHWdOdwQ6mutSHD9mDPNTkYAcZ0JzBK-yOBv6u4YZyewMToeyPDjTlwDNNmz5s4l0lkmHDN2chbM6ORZ_Gv1ZpM8ViE6JmSc7MQcvdiFzlB_hsu4b-YIhzMHr_KytzDV-r87sQMWI1K9JgXoWCfavBgkO0Rth2_N9YNc-kT4vGswNMl0M_TYsbqhBqR_UKH0C43ZAsxdEQAFZZtN_unj9iII8I554eg7sKmPcS4UUOrliJAxdozD1CBHrzakk_3X4XcqYeCwDGob1G4em0kXcE92QDgQcsYYWv8vdn6QllA37kZLZoEKV17WPNm_lw0";
const INVALID_ACCESS_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90L21pc2FwcmV0Iiwia2lkIjoiY2VjYzcyY2ItZGMzZS00OGY2LTk0OWEtN2ZmZjFhN2VjNWFiIiwidHlwIjoiSldUIn0.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJjaWQiOiI4NDYwZGJkMS0yOGM2LTQ3N2ItOTg5YS1iNzFiODUwYzI5NmQiLCJleHAiOjQxNDYzMTU4ODk3MzEsImlzcyI6Im1pc2FwcmV0Lmh0dHA6Ly9sb2NhbGhvc3Q6NDAwMCIsImp0aSI6IjM0YjAwOTgzLWFkNmMtNDhkYi04N2U3LWNhZjBlYmM5YjhhNyIsImp0dCI6ImFjY2VzcyIsInNjcCI6WyJvcGVuaWQiLCJlbWFpbCJdLCJzdWIiOiI5ZWM1YWFhOC0zODFlLTQ2NWYtODMyMS0zNmUxNGM1ZTFlZTciLCJ0bnQiOiJtaXNhcHJldCIsInZlciI6MX0.qrd3yoEJYJ8LtyS9A_lJtZ89pSKCQIOWUgd40Tm_M_99SJHTmSMEoIgsbrUM94j_FCrZLe2omsOcPR6mfbRJFevlXQe6yzsE9ROsHGgI-E44AcDLjDN5y3Mri2VfYnaOuVhtb6ubZuAwqzuVnxkNIiEEhlwnshIyVUxopqpbklrQ6PN-ob7tt8x_EX8qJxm63GZYGQRSJRoPmVOARRZbpl75gYVdwL3UI9SKiBD-Um2zkJ1-eXddkXbVZkGl6Xyb9-B0-IpWeP77FP0QblFlR_atHY9jReIYAoSNzR92hWcRrUXC92g0STdH1CmLNgmamBxO9ASdsTneU4bWD_rEVmp3Yk8Uq-wlWwhFdnz9u_BPN0wLsrLUfk0aKOC14N9T9-imtl8zubR_TSqXqQXfUJ_m7omkZ2X8ZilpZWkHzsBaXOu-vvIoo2cJNX2QFl3J6WasnlSQCf3kiRJYz8_W1maiqrlWXNK2KGTxGO2_6VYYj4hMce7IlZQ2dx5G4mP511z7hIEh7Jq90-dmWjGtq9Rt91cdQ7uo5p90U4DaGKRnZU0S2XzLQcxUigKX9dsqsCeeZXVQZ_otihMzDt4SflcNvUliEV848P3WI1Y03fujCwwndY4pGrf91G8gqwhVCoFtgB_bJoOPiSFhJAzZ7twm7Hj-qf-Z7BTCrZfsaqg";

const KEY1 = `-----BEGIN CERTIFICATE-----
MIIF/TCCA+WgAwIBAgIJALdrmfHj/aU/MA0GCSqGSIb3DQEBCwUAMIGJMQswCQYD
VQQGEwJGUjENMAsGA1UECAwETm9yZDEOMAwGA1UEBwwFTGlsbGUxFTATBgNVBAoM
DFByb215emUgVGVhbTEjMCEGA1UEAwwacHJvbXl6ZS5hdXRoZW50Lm1lIFJvb3Qg
Q0ExHzAdBgNVBAsMFlByb215emUgVGVhbSBieSBDcnlwdHIwHhcNMjMwODAyMTM1
NDQ2WhcNNDgwODAxMTM1OTQ2WjCBiTELMAkGA1UEBhMCRlIxDTALBgNVBAgMBE5v
cmQxDjAMBgNVBAcMBUxpbGxlMRUwEwYDVQQKDAxQcm9teXplIFRlYW0xIzAhBgNV
BAMMGnByb215emUuYXV0aGVudC5tZSBSb290IENBMR8wHQYDVQQLDBZQcm9teXpl
IFRlYW0gYnkgQ3J5cHRyMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
wK6OPQAKz6YCRw7YaSyIT8iksAmQ2LEk7lPuAV4m0QK4eS4EFOFXK9tgtk5hJfAE
JrGI696ZuggekOBmN/6a85d9RI20r6eQPZFQShP92ugBIIxoYO/KEkXtqxobW4gZ
kfte3lQldwjtheyuuQ+g7c0qhpidqjf657xuJGu+IaHllnIljAmAQrb24ya7LvTh
vdLoEM5d9BsGLOwnPsgftOsdB5z1zdnoKK7SLU5wRhpw5tpAOh5diW3IOWU+au10
AS392ErdJrL8D6rxBsdiLOtsz0wRQDWIwbQRP3UewTXt86ajA34fhv43wZlSVI6a
hGgl3BXUGN9N58wtr4BoVDB41xyo0PavP1IglhwBUFQlDu6mm46UB0lzO5MF1zBr
3ep8bxE12fUmcWsf2DhHZCiIEdR9envuOh3G66sjbiD6YJylDmashAF3f8Et34dj
VwqggV6zM9pnYC8SJ5HH+qpHoi8wkjPfhFoB0+62mF+uZMEakGjuE1L/izOAOw3G
hLgc930uQmWaS8cjzvafR/mspFNI5FmUAwTJ/NJZ9yaF5zik4ni9mCtbjxvAqFjb
IHLW94ppgX8LEUl7xXv1hp+qlBFbZ4vOasVOJoLZlSb85dit78lPYA7SXDB6ABhM
sm/MDVcmhbKw1/EQik76Nwf3nRoJgHRYPpd748gRhgcCAwEAAaNmMGQwEgYDVR0T
AQH/BAgwBgEB/wIBATAOBgNVHQ8BAf8EBAMCAYYwHQYDVR0OBBYEFI9WvYOf6Ubo
zn0ifBvrRDdqSvGYMB8GA1UdIwQYMBaAFI9WvYOf6Ubozn0ifBvrRDdqSvGYMA0G
CSqGSIb3DQEBCwUAA4ICAQBIBuO7K5U1XRzKFcXOjVbme3nInzp7eQBGPRGJlC4d
GeEUSrr4I0BHu7CxmU6vdI7TNYnB83FOeR6tKdB+C5XoHSZ1+9m+x1cNzynycy97
Z8YF1G2H510In6Gh/uEqeHly9DSQ1hovcteOAJ6qT5hwGpGjDY37y1hZS3qbOeNz
WXYDArxKC1/A8vH4y73MDPLPTRf5zfWNG2JGKEoX1czT7OAvL46pLleNhmYWWXAB
rfiRrLxq+TEmr0DVM88PNNcFiose7ukVK6SdmEZ7wztDgg0NYhMzsfyyMMOoKhNZ
5ivQjdzjmOeJPxINXDLirTR7Etg62lY5VrshawKjNHH+nELWsIalTDbxgWMbnYQr
H8Aoh+O6lw48jjElpXM75kQWUFjCrP3CVs/sTpA+34W3VJ82dothM2W3u9av2tb7
jrJrjB5XKYJzDylwr/fMU2qP4pmA8YqSPCg8mM8DdvrJ0viDrLzsydyn6TOPRlnv
Tv9bTspUzkzRSvSevXA5pA3sABzpgulxQz7Euh6qkb6fOVQ3hD6IEFwdcD9ulRQM
lde7hkdOYJ619sQOWv6gIH0uHjVj4cmxLawzu0av/SocsBES+EzPMK49KNgZYBbb
1DDX7D8bTQD5pEKb4FkUBiurMe9XSAAeKsJbpBJoccnG3y2eXnt0Ji2jkVWpo/ko
eA==
-----END CERTIFICATE-----
`

const KEY2 = `-----BEGIN CERTIFICATE-----
MIIF/TCCA+WgAwIBAgIJALdrmfHj/aU/MA0GCSqGSIb3DQEBCwUAMIGJMQswCQYD
VQQGEwJGUjENMAsGA1UECAwETm9yZDEOMAwGA1UEBwwFTGlsbGUxFTATBgNVBAoM
DFByb215emUgVGVhbTEjMCEGA1UEAwwacHJvbXl6ZS5hdXRoZW50Lm1lIFJvb3Qg
Q0ExHzAdBgNVBAsMFlByb215emUgVGVhbSBieSBDcnlwdHIwHhcNMjMwODAyMTM1
NDQ2WhcNNDgwODAxMTM1OTQ2WjCBiTELMAkGA1UEBhMCRlIxDTALBgNVBAgMBE5v
cmQxDjAMBgNVBAcMBUxpbGxlMRUwEwYDVQQKDAxQcm9teXplIFRlYW0xIzAhBgNV
BAMMGnByb215emUuYXV0aGVudC5tZSBSb290IENBMR8wHQYDVQQLDBZQcm9teXpl
IFRlYW0gYnkgQ3J5cHRyMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
wK6OPQAKz6YCRw7YaSyIT8iksAmQ2LEk7lPuAV4m0QK4eS4EFOFXK9tgtk5hJfAE
JrGI696ZuggekOBmN/6a85d9RI20r6eQPZFQShP92ugBIIxoYO/KEkXtqxobW4gZ
kfte3lQldwjtheyuuQ+g7c0qhpidqjf657xuJGu+IaHllnIljAmAQrb24ya7LvTh
vdLoEM5d9BsGLOwnPsgftOsdB5z1zdnoKK7SLU5wRhpw5tpAOh5diW3IOWU+au10
AS392ErdJrL8D6rxBsdiLOtsz0wRQDWIwbQRP3UewTXt86ajA34fhv43wZlSVI6a
hGgl3BXUGN9N58wtr4BoVDB41xyo0PavP1IglhwBUFQlDu6mm46UB0lzO5MF1zBr
3ep8bxE12fUmcWsf2DhHZCiIEdR9envuOh3G66sjbiD6YJylDmashAF3f8Et34dj
VwqggV6zM9pnYC8SJ5HH+qpHoi8wkjPfhFoB0+62mF+uZMEakGjuE1L/izOAOw3G
hLgc930uQmWaS8cjzvafR/mspFNI5FmUAwTJ/NJZ9yaF5zik4ni9mCtbjxvAqFjb
IHLW94ppgX8LEUl7xXv1hp+qlBFbZ4vOasVOJoLZlSb85dit78lPYA7SXDB6ABhM
sm/MDVcmhbKw1/EQik76Nwf3nRoJgHRYPpd748gRhgcCAwEAAaNmMGQwEgYDVR0T
AQH/BAgwBgEB/wIBATAOBgNVHQ8BAf8EBAMCAYYwHQYDVR0OBBYEFI9WvYOf6Ubo
zn0ifBvrRDdqSvGYMB8GA1UdIwQYMBaAFI9WvYOf6Ubozn0ifBvrRDdqSvGYMA0G
CSqGSIb3DQEBCwUAA4ICAQBIBuO7K5U1XRzKFcXOjVbme3nInzp7eQBGPRGJlC4d
GeEUSrr4I0BHu7CxmU6vdI7TNYnB83FOeR6tKdB+C5XoHSZ1+9m+x1cNzynycy97
Z8YF1G2H510In6Gh/uEqeHly9DSQ1hovcteOAJ6qT5hwGpGjDY37y1hZS3qbOeNz
WXYDArxKC1/A8vH4y73MDPLPTRf5zfWNG2JGKEoX1czT7OAvL46pLleNhmYWWXAB
rfiRrLxq+TEmr0DVM88PNNcFiose7ukVK6SdmEZ7wztDgg0NYhMzsfyyMMOoKhNZ
5ivQjdzjmOeJPxINXDLirTR7Etg62lY5VrshawKjNHH+nELWsIalTDbxgWMbnYQr
H8Aoh+O6lw48jjElpXM75kQWUFjCrP3CVs/sTpA+34W3VJ82dothM2W3u9av2tb7
jrJrjB5XKYJzDylwr/fMU2qP4pmA8YqSPCg8mM8DdvrJ0viDrLzsydyn6TOPRlnv
Tv9bTspUzkzRSvSevXA5pA3sABzpgulxQz7Euh6qkb6fOVQ3hD6IEFwdcD9ulRQM
lde7hkdOYJ619sQOWv6gIH0uHjVj4cmxLawzu0av/SocsBES+EzPMK49KNgZYBbb
1DDX7D8bTQD5pEKb4FkUBiurMe9XSAAeKsJbpBJoccnG3y2eXnt0Ji2jkVWpo/ko
eA==
-----END CERTIFICATE-----
`

describe("new CryptrJwtVerifier(cryptrConfig)", () => {
  it("should return an instancied Verifier with a config", () => {
    expect(cryptrJwtVerifier.cryptrConfig).toMatchObject({
      audiences: ["http://localhost:8000"],
      tenants: ["communitiz-app", "3-belges"],
      issuer: "http://localhost:4000",
    });
  });

  it("should generate a jwksUri", () => {
    expect(cryptrJwtVerifier.jwksUri).toMatch(
      "http://localhost:4000/.well-known"
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
      tenants: ["communitiz-app"],
      issuer: "http://localhost:4000",
    });
  });
});

describe("getKid(token)", () => {
  it("should return key identifier (kid)", () => {
    expect(cryptrJwtVerifier.getKid(VALID_ACCESS_TOKEN)).toBe(
      "9b95e6c7-1118-4920-a854-3a26c83269e9"
    );
  });
  
  it("should return key identifier (kid)", () => {
    expect(cryptrJwtVerifier.getKid(INVALID_ACCESS_TOKEN)).toBe(
      "cecc72cb-dc3e-48f6-949a-7fff1a7ec5ab"
    );
  });
  
  it("should fail if wrong token", () => {
    expect(() => cryptrJwtVerifier.getKid("azerty")).toThrow();
  });
});

describe("getTnt(token)", () => {
  it("should return tenant domain (tnt)", () => {
    expect(cryptrJwtVerifier.getTnt(VALID_ACCESS_TOKEN)).toBe(
      "3-belges"
    );
  });
  
  it("should return tenant domain (tnt)", () => {
    expect(cryptrJwtVerifier.getTnt(INVALID_ACCESS_TOKEN)).toBe(
      "misapret"
    );
  });
  
  it("should fail if wrong token", () => {
    expect(() => cryptrJwtVerifier.getTnt("azerty")).toThrow();
  });
});

describe("getPublicKey(kid)", () => {
  xit("should return public key", async () => {
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

describe("verifyTokenWithKey/4", () => {
  xit('should return success', async() => {
    const verification = await cryptrJwtVerifier.verifyTokenWithKey(VALID_ACCESS_TOKEN, KEY2, (value) => value, (reason) => reason);
    console.debug(verification)
    expect(verification).not.toBeFalsy()
  })
})

describe('handleVerifySuccess', () => {
  it('should return body with valid true if proper input', () => {
    const resolve = jest.fn(value => value)
    const reject = jest.fn(value => value)
    const verifiedJwt = {
      "body": {
        "cid": "414bb229-66a8-4351-ad93-1309e0b07a02",
        "iss": "http://localhost:4000/t/communitiz-app",
        "tnt": "communitiz-app",
        "aud": "http://localhost:8000",
      }
    }
    cryptrJwtVerifier.handleVerifySuccess(verifiedJwt, resolve, reject)
    expect(resolve).toHaveBeenCalledWith(
      {
        valid: true,
        claims: {
          "cid": "414bb229-66a8-4351-ad93-1309e0b07a02",
          "iss": "http://localhost:4000/t/communitiz-app",
          "tnt": "communitiz-app",
          "aud": "http://localhost:8000"
      }
      }
    )
    expect(reject).not.toHaveBeenCalled()
  })
  
  it('should return error with valid true if wrong tnt input', () => {
    const resolve = jest.fn(value => value)
    const reject = jest.fn(value => value)
    const verifiedJwt = {
      "body": {
        "cid": "414bb229-66a8-4351-ad93-1309e0b07a02",
        "iss": "http://localhost:4000/t/shark-academy",
        "tnt": "misapret",
        "aud": "http://localhost:8000"
      }
    }
    cryptrJwtVerifier.handleVerifySuccess(verifiedJwt, resolve, reject)
    expect(resolve).not.toHaveBeenCalled()
    expect(reject).toHaveBeenCalledWith({
      valid: false,
      "errors": "Non-compliant claims,\nplease check issuer, tenants"
    })
  })
})

describe("verify(token)", () => {
  it("should valid token with decode claims", async () => {
    await cryptrJwtVerifier
      .verify(VALID_ACCESS_TOKEN)
      .then((resp) => {
        expect(resp).toEqual({
          valid: true,
          claims: {
            application_metadata: {},
            aud: "http://localhost:8000",
            cid: "414bb229-66a8-4351-ad93-1309e0b07a02",
            dbs: "sandbox",
            email: "thibaud@3-belges.fr",
            exp: 1797678396,
            iat: 1703070433,
            ips: "cryptr",
            iss: "http://localhost:4000/t/3-belges",
            jti: "ec903ea8-d203-47cd-b7e1-6965b4ee7e2c",
            jtt: "access",
            sci: null,
            scp: ["openid", "email", "profile"],
            sub: "083ad3e1-cd28-4ee3-a6bd-7592bc1d09ea",
            tnt: "3-belges",
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
  it('should unvalid token with no signing key', async () => {
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
        expect(resp.errors).toStrictEqual("Non-compliant claims,\nplease check tenants")
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
