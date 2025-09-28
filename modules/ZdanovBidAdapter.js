import { registerBidder } from '../src/adapters/bidderFactory.js';
import { BANNER } from '../src/mediaTypes.js';

const BIDDER_CODE = 'zhdanov';
const ENDPOINT = 'https://prebid.zhdanov.ua/actions';

export const spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [BANNER],

  isBidRequestValid: function (bid) {
    return !!(bid && bid.params && bid.params.placementId);
  },

  buildRequests: function (validBidRequests, bidderRequest) {
    const requests = validBidRequests.map(bid => {
      return {
        method: 'POST',
        url: ENDPOINT,
        data: {
          placementId: bid.params.placementId,
          bidId: bid.bidId,
          sizes: bid.sizes || [],
          referer: bidderRequest?.refererInfo?.page
        }
      };
    });

    return requests;
  },

  interpretResponse: function (serverResponse, request) {
    const bids = serverResponse.body?.bids || [];
    return bids.map(bid => ({
      requestId: bid.requestId || request.data.bidId,
      cpm: bid.cpm,
      width: bid.width,
      height: bid.height,
      ad: bid.ad,
      currency: bid.currency || 'USD',
      netRevenue: true,
      ttl: bid.ttl || 300,
      creativeId: bid.creativeId || bid.requestId
    }));
  }
};

registerBidder(spec);
