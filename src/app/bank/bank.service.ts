import { Injectable } from '@angular/core';

import { CoinsBalance } from '../models/coins-balance';
import { CoinsEnum } from '../shared/coins.enum';
import { InitialBankCoins } from './initial-bank-coins';

@Injectable()
export class BankService extends CoinsBalance {

  constructor(initialBankCoins: InitialBankCoins) {
    super(initialBankCoins.nickles, initialBankCoins.dimes, initialBankCoins.quarters);
  }
}
