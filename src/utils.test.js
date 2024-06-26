import {claimsErrors, getClaimsDomain, getClaimsVersion, genIss} from './utils'

describe('getClaimsVersion/1', () => {
  it('should return undefined if empty object', () => {
    expect(getClaimsVersion({})).toEqual(-1)
  })
  it('should return proper version if ver claim present', () => {
    expect(getClaimsVersion({ver: 3})).toEqual(3)
    expect(getClaimsVersion({ver: 1})).toEqual(1)
  })
}) 

describe('getClaimsDomain/1', () => {
  it('should return undefined if empty object', () => {
    expect(getClaimsDomain({})).toBeFalsy()
  })
  
  it('should return undefined if only version present', () => {
    expect(getClaimsDomain({ver: 3})).toBeFalsy()
    expect(getClaimsDomain({ver: 1})).toBeFalsy()
  })
  it('should return tnt value if not version 3', () => {
    expect(getClaimsDomain({ver: 2, org: "org", tnt: "tnt"})).toEqual("tnt")
    expect(getClaimsDomain({ver: 1, org: "org", tnt: "tnt"})).toEqual("tnt")
  })
  
  it('should return org value if version 3', () => {
    expect(getClaimsDomain({ver: 3, org: "org", tnt: "tnt"})).toEqual("org")
  })
}) 

describe('genIss/2', () => {
  test('should return built-in issuer from given params', () => {
    expect(genIss('domain', 'http://localhost:4000')).toEqual('http://localhost:4000/t/domain')
  })
  
  test('should return built-in issuer from v3 given claims', () => {
    let domain = getClaimsDomain({ver: 3, tnt: 'tnt', org: 'domain'})
    expect(genIss(domain, 'http://localhost:4000')).toEqual('http://localhost:4000/t/domain')
  })
  
  test('should return built-in issuer from v1 given claims', () => {
    let domain = getClaimsDomain({ver: 1, tnt: 'tnt', org: 'domain'})
    expect(genIss(domain, 'http://localhost:4000')).toEqual('http://localhost:4000/t/tnt')
  })
})

describe('claimsErrors/2', () => {
  test('should fail if empty claims', () => {
    expect(claimsErrors({}, {
      audiences: [],
      client_ids: [],
      tenants: [],
      issuer: [],
    })).toEqual({
      audiences: false,
      client_ids: false,
      issuer: false,
      tenants: false,
    })
  })
  
  test('should return success if token V3 and proper related config', () => {
    expect(claimsErrors({
      ver: 3,
      org: 'org',
      aud: 'http://localhost:3000'
    }, {
      audiences: ['http://localhost:3000'],
      client_ids: [],
      tenants: ['org'],
      issuer: [],
    })).toEqual({
      audiences: true,
      client_ids: true,
      issuer: true,
      tenants: true,
    })
  })
  
  test('should return audience error if token V3 if openid and wrong aud', () => {
    expect(claimsErrors({
      ver: 3,
      org: 'org',
      jtt: 'openid',
      aud: 'http://localhost:4000'
    }, {
      audiences: ['http://localhost:3000'],
      client_ids: [],
      tenants: ['org'],
      issuer: [],
    })).toEqual({
      audiences: false,
      client_ids: true,
      issuer: true,
      tenants: true,
    })
  })
  
  test('should return tenant error if token V3 if wrong org', () => {
    expect(claimsErrors({
      ver: 3,
      org: 'org1',
      jtt: 'openid',
      aud: 'http://localhost:3000'
    }, {
      audiences: ['http://localhost:3000'],
      client_ids: ['http://localhost:3000'],
      tenants: ['org'],
      issuer: [],
    })).toEqual({
      audiences: true,
      client_ids: true,
      issuer: true,
      tenants: false,
    })
  })
  
  test('should return success if token V1 and proper related config', () => {
    expect(claimsErrors({
      ver: 1,
      cid: 'client_id',
      tnt: 'org',
      iss: 'http://localhost:4000/t/org',
      aud: 'http://localhost:3000'
    }, {
      audiences: ['http://localhost:3000'],
      client_ids: ['client_id'],
      tenants: ['org'],
      issuer: ['http://localhost:4000'],
    })).toEqual({
      audiences: true,
      client_ids: true,
      issuer: true,
      tenants: true,
    })
  })
  
  test('should return audience error if token V1 and wrong aud', () => {
    expect(claimsErrors({
      ver: 1,
      cid: 'client_id',
      tnt: 'org',
      iss: 'http://localhost:4000/t/org',
      aud: 'http://localhost:5000'
    }, {
      audiences: ['http://localhost:3000'],
      client_ids: ['client_id'],
      tenants: ['org'],
      issuer: ['http://localhost:4000'],
    })).toEqual({
      audiences: false,
      client_ids: true,
      issuer: true,
      tenants: true,
    })
  })
  
  test('should return tenants error if token V1 and wrong tnt', () => {
    expect(claimsErrors({
      ver: 1,
      cid: 'client_id',
      tnt: 'org1',
      iss: 'http://localhost:4000/t/org1',
      aud: 'http://localhost:5000'
    }, {
      audiences: ['http://localhost:3000'],
      client_ids: ['client_id'],
      tenants: ['org'],
      issuer: ['http://localhost:4000'],
    })).toEqual({
      audiences: false,
      client_ids: true,
      issuer: true,
      tenants: false,
    })
  })
  
  test('should return client_ids error if token V1 and wrong cid', () => {
    expect(claimsErrors({
      ver: 1,
      cid: 'client_id1',
      tnt: 'org',
      iss: 'http://localhost:4000/t/org',
      aud: 'http://localhost:3000'
    }, {
      audiences: ['http://localhost:3000'],
      client_ids: ['client_id'],
      tenants: ['org'],
      issuer: ['http://localhost:4000'],
    })).toEqual({
      audiences: true,
      client_ids: false,
      issuer: true,
      tenants: true,
    })
  })
  
  test('should return issuer if token V1 and wrong iss claim', () => {
    expect(claimsErrors({
      ver: 1,
      cid: 'client_id',
      tnt: 'org',
      iss: 'http://localhost:4000/t/org1',
      aud: 'http://localhost:3000'
    }, {
      audiences: ['http://localhost:3000'],
      client_ids: ['client_id'],
      tenants: ['org'],
      issuer: ['http://localhost:4000'],
    })).toEqual({
      audiences: true,
      client_ids: true,
      issuer: false,
      tenants: true,
    })
  })
})