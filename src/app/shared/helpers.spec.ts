import { formatDisplayPrice } from '../shared/helpers';
import { StringConstants } from '../shared/string-constants';

describe('Helpers: formatDisplayPrice', () => {
  it('various prices are formatted properly for display', () => {
    expect(formatDisplayPrice(   1)).toEqual(StringConstants.PRICE_MESSAGE_PREFIX +  ' $0.01');
    expect(formatDisplayPrice(  10)).toEqual(StringConstants.PRICE_MESSAGE_PREFIX +  ' $0.10');
    expect(formatDisplayPrice( 100)).toEqual(StringConstants.PRICE_MESSAGE_PREFIX +  ' $1.00');
    expect(formatDisplayPrice(1000)).toEqual(StringConstants.PRICE_MESSAGE_PREFIX + ' $10.00');
    expect(formatDisplayPrice(  23)).toEqual(StringConstants.PRICE_MESSAGE_PREFIX +  ' $0.23');
    expect(formatDisplayPrice( 234)).toEqual(StringConstants.PRICE_MESSAGE_PREFIX +  ' $2.34');
    expect(formatDisplayPrice(2345)).toEqual(StringConstants.PRICE_MESSAGE_PREFIX + ' $23.45');
  });
});
