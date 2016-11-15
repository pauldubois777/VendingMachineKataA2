import { StringConstants } from './string-constants';

export function formatDisplayPrice(priceInCents: number): string {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return StringConstants.PRICE_MESSAGE_PREFIX + ' ' + formatter.format(priceInCents / 100);
}
