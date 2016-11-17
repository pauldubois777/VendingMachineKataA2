import { formatPrice } from '../shared/helpers';

describe('Helpers: formatDisplayPrice', () => {
  it('various prices are formatted properly for display', () => {
    expect(formatPrice(   1)).toEqual('$0.01');
    expect(formatPrice(  10)).toEqual('$0.10');
    expect(formatPrice( 100)).toEqual('$1.00');
    expect(formatPrice(1000)).toEqual('$10.00');
    expect(formatPrice(  23)).toEqual('$0.23');
    expect(formatPrice( 234)).toEqual('$2.34');
    expect(formatPrice(2345)).toEqual('$23.45');
  });
});
