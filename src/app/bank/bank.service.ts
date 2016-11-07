import { Injectable } from '@angular/core';

import { CoinsEnum } from '../shared/coins.enum';
import { InitialBankCoins } from '../shared/initial-bank-coins';

@Injectable()
export class BankService {
  private _coinQuantities: Array<number>;

  constructor() {
    this._coinQuantities = new Array<number>();
    this._coinQuantities[CoinsEnum.NICKLE] = InitialBankCoins[CoinsEnum.NICKLE];
    this._coinQuantities[CoinsEnum.DIME] = InitialBankCoins[CoinsEnum.DIME];
    this._coinQuantities[CoinsEnum.QUARTER] = InitialBankCoins[CoinsEnum.QUARTER];
  }

  get Coins(): Array<number>{
     return this._coinQuantities.slice(0);
  }
}
