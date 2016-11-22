import { CoinsEnum } from './coins.enum';

export function formatPrice(priceInCents: number): string {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return formatter.format(priceInCents / 100);
}

export function getCoinText(coinEnum: CoinsEnum): string {

  switch (coinEnum) {
    case CoinsEnum.PENNY:
      return '1c';
    case CoinsEnum.NICKLE:
      return '5c';
    case CoinsEnum.DIME:
      return '10c';
    case CoinsEnum.QUARTER:
      return '25c';
    default:
      return 'Unknown';
  }
}

export function getCoinUrl(coinEnum: CoinsEnum): string {

  switch (coinEnum) {
    case CoinsEnum.PENNY:
      return 'assets/images/coins/penny.png';
    case CoinsEnum.NICKLE:
      return 'assets/images/coins/nickle.png';
    case CoinsEnum.DIME:
      return 'assets/images/coins/dime.png';
    case CoinsEnum.QUARTER:
      return 'assets/images/coins/quarter.png';
    default:
      return 'assets/images/coins/unknown.png';
  }
}
