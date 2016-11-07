import { Injectable } from '@angular/core';

import { InitialBankCoins } from './initial-bank-coins';
import { CoinsEnum } from '../shared/coins.enum';

@Injectable()
export class InitialBankCoinsService {
  private _initialCoinQuantities: number[];

  constructor() {
    this._initialCoinQuantities = [];
    this._initialCoinQuantities[CoinsEnum.NICKLE] = InitialBankCoins[CoinsEnum.NICKLE];
    this._initialCoinQuantities[CoinsEnum.DIME] = InitialBankCoins[CoinsEnum.DIME];
    this._initialCoinQuantities[CoinsEnum.QUARTER] = InitialBankCoins[CoinsEnum.QUARTER];
  }

  get InitialCoins(): Array<number>{
     return this._initialCoinQuantities.slice(0);
  }
}
