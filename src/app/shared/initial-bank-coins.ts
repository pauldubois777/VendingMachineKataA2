import { CoinsEnum } from './coins.enum';

export class InitialBankCoins {
  coins: Array<number>;

  constructor () {
    this.coins = new Array<number>();
    this.coins[CoinsEnum.NICKLE] = 8;
    this.coins[CoinsEnum.DIME] = 7;
    this.coins[CoinsEnum.QUARTER] = 6;
  }
}
