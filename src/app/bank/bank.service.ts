import { Injectable } from '@angular/core';

import { CoinsBalance } from '../models/coins-balance';
import { CoinsEnum } from '../shared/coins.enum';
import { InitialBankCoins } from './initial-bank-coins';
import { CoinReturnService } from '../coin-return/coin-return.service';

@Injectable()
export class BankService extends CoinsBalance {

  constructor(initialBankCoins: InitialBankCoins, private coinReturnService: CoinReturnService) {
    super(initialBankCoins.nickles, initialBankCoins.dimes, initialBankCoins.quarters);
  }

  get CanMakeChange(): boolean {
    // Based on valid coins being nickle, dime, and quarter, the most change that will ever be
    // needed is 20 cents. 
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
    let numberOfQuartersToReturn = Math.floor(valueInCents / 25);

    if (numberOfQuartersToReturn > 0 && numberOfQuartersToReturn <= this.getCoinBalance(CoinsEnum.QUARTER)) {
      for (let x = 0; x < numberOfQuartersToReturn; x++) {
        this.removeCoin(CoinsEnum.QUARTER);
        this.coinReturnService.addToReturn(CoinsEnum.QUARTER);
        valueInCents = valueInCents % 25;
      }
    }

    return valueInCents;
  }
}
