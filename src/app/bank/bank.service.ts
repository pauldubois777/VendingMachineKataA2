import { Injectable } from '@angular/core';

import { CoinsEnum } from '../shared/coins.enum';
import { InitialBankCoinsService } from './initial-bank-coins.service';

@Injectable()
export class BankService {
  private _coinQuantities: Array<number>;

  constructor(private _initialBankCoinsService: InitialBankCoinsService) {
    this._coinQuantities = _initialBankCoinsService.InitialCoins;
  }

  get Coins(): Array<number>{
     return this._coinQuantities.slice(0);
  }
}
