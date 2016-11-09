import { CoinsEnum } from '../shared/coins.enum';

export class CoinsBalance {
  constructor(
    private _nickels = 0,
    private _dimes = 0,
    private _quarters = 0
  ) { }

  addCoin(coinEnum: CoinsEnum): boolean {
    if (coinEnum === CoinsEnum.NICKLE) {
      this._nickels++;
      return true;
    } else {
      if (coinEnum === CoinsEnum.DIME) {
        this._dimes++;
        return true;
      } else {
        if (coinEnum === CoinsEnum.QUARTER) {
          this._quarters++;
          return true;
        } else {
          return false;
        }
      }
    }
  }

  removeCoin(coinEnum: CoinsEnum): boolean {
    if (coinEnum === CoinsEnum.NICKLE && this._nickels > 0) {
      this._nickels--;
      return true;
    } else {
      if (coinEnum === CoinsEnum.DIME && this._dimes > 0) {
        this._dimes--;
        return true;
      } else {
        if (coinEnum === CoinsEnum.QUARTER && this._quarters > 0) {
          this._quarters--;
          return true;
        } else {
          return false;
        }
      }
    }
  }

  reset() {
    this._nickels = 0;
    this._dimes = 0;
    this._quarters = 0;
  }

  getCoinBalance(coinEnum: CoinsEnum): number {
    if (coinEnum === CoinsEnum.NICKLE) {
      return this._nickels;
    } else {
      if (coinEnum === CoinsEnum.DIME) {
        return this._dimes;
      } else {
        if (coinEnum === CoinsEnum.QUARTER) {
          return this._quarters;
        } else {
          return 0;
        }
      }
    }
  }

  // Return value in cents to avoid Javascript floating point issues
  get ValueInCents(): number {
    return (this._nickels * 5) + (this._dimes * 10) + (this._quarters * 25);
  }
}
