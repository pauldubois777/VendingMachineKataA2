import { Injectable } from '@angular/core';

import { CoinsBalance } from '../models/coins-balance';
import { CoinsEnum } from '../shared/coins.enum';
import { BankService } from '../bank/bank.service';
import { CoinReturnService } from '../coin-return/coin-return.service';

@Injectable()
export class InsertedCoinsService extends CoinsBalance {

  constructor(private coinReturnService: CoinReturnService, private bankService: BankService) {
    super(0, 0, 0);
  }

}
