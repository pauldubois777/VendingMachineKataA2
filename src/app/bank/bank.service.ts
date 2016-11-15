import { Injectable } from '@angular/core';

import { CoinsBalance } from '../models/coins-balance';
import { CoinsEnum } from '../shared/coins.enum';
import { InitialBankCoins } from './initial-bank-coins';
import { CoinReturnService } from '../coin-return/coin-return.service';

@Injectable()
export class BankService extends CoinsBalance {

  constructor(initialBankCoins: InitialBankCoins, private _coinReturnService: CoinReturnService) {
    super(initialBankCoins.nickles, initialBankCoins.dimes, initialBankCoins.quarters);
  }

  get CanMakeChange(): boolean {
    // Based on valid coins being nickle, dime, and quarter, the most change that will ever be
    // needed is 20 cents. This is because we will get all of the users money.  So we will
    // Always be able to return their own money back to them beyond the 20 cents.
    if (this.getCoinBalance(CoinsEnum.NICKLE) >= 4) {
      return true;
    } else {
      if (this.getCoinBalance(CoinsEnum.NICKLE) >= 2 && this.getCoinBalance(CoinsEnum.DIME) >= 1) {
        return true;
      } else {
        if (this.getCoinBalance(CoinsEnum.NICKLE) >= 1 && this.getCoinBalance(CoinsEnum.DIME) >= 2) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  returnThisAmount(valueInCents: number): number {

    // Return higher denomination coins first
    let remainingValueInCents = this.returnCoinDenomination(valueInCents, CoinsEnum.QUARTER, 25);

    if (remainingValueInCents > 0) {
      remainingValueInCents = this.returnCoinDenomination(remainingValueInCents, CoinsEnum.DIME, 10);
    }

    if (remainingValueInCents > 0) {
      remainingValueInCents = this.returnCoinDenomination(remainingValueInCents, CoinsEnum.NICKLE, 5);
    }

    return remainingValueInCents; // In case the bank doesn't have enough and/or proper coins.  Let the caller deal with that.
  }

  private returnCoinDenomination(
    valueRemainingInCents: number,
    coinEnum: CoinsEnum,
    coinValueInCents: number): number {

    let numberOfCoinsToReturn = Math.floor(valueRemainingInCents / coinValueInCents);
    if (numberOfCoinsToReturn > 0) {
      if (numberOfCoinsToReturn > this.getCoinBalance(coinEnum)) {
        numberOfCoinsToReturn = this.getCoinBalance(coinEnum);
      }
      for (let x = 0; x < numberOfCoinsToReturn; x++) {
        this.removeCoin(coinEnum);
        this._coinReturnService.addToReturn(coinEnum);
      }
      valueRemainingInCents = valueRemainingInCents - (numberOfCoinsToReturn * coinValueInCents);
    }

    return valueRemainingInCents;
  }
}
