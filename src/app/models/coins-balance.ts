import { EventEmitter } from '@angular/core';

import { CoinsEnum } from '../shared/coins.enum';

export class CoinsBalance {
  balanceChangedObservable = new EventEmitter<null>();

  constructor(
    private _nickels = 0,
    private _dimes = 0,
    private _quarters = 0
  ) { }

  protected addCoin(coinEnum: CoinsEnum): boolean {
    if (coinEnum === CoinsEnum.NICKLE) {
      this._nickels++;
      this.balanceChangedObservable.emit();
      return true;
    } else {
      if (coinEnum === CoinsEnum.DIME) {
        this._dimes++;
        this.balanceChangedObservable.emit();
        return true;
      } else {
        if (coinEnum === CoinsEnum.QUARTER) {
          this._quarters++;
          this.balanceChangedObservable.emit();
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
      this.balanceChangedObservable.emit();
      return true;
    } else {
      if (coinEnum === CoinsEnum.DIME && this._dimes > 0) {
        this._dimes--;
        this.balanceChangedObservable.emit();
        return true;
      } else {
        if (coinEnum === CoinsEnum.QUARTER && this._quarters > 0) {
          this._quarters--;
          this.balanceChangedObservable.emit();
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
    this.balanceChangedObservable.emit();
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
  getValueInCents(): number {
    return (this._nickels * 5) + (this._dimes * 10) + (this._quarters * 25);
  }
}
