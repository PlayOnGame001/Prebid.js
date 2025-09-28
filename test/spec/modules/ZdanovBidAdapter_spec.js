import { expect } from 'chai';
import { spec } from 'modules/ZdanovBidAdapter.js';

describe('ZhdanovBidAdapter', function () {
  const validBid = {
    bidId: '123',
    params: { placementId: 'abc' },
    sizes: [[300, 250]]
  };

  it('✅ isBidRequestValid возвращает true при наличии placementId', function () {
    expect(spec.isBidRequestValid(validBid)).to.equal(true);
  });

  it('❌ isBidRequestValid возвращает false если нет placementId', function () {
    const invalidBid = { bidId: '123', params: {} };
    expect(spec.isBidRequestValid(invalidBid)).to.equal(false);
  });
});
