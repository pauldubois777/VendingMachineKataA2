import { Injectable } from '@angular/core';

import { CoinsBalance } from '../models/coins-balance';
import { CoinsEnum } from '../shared/coins.enum';
import { BankService } from '../bank/bank.service';
import { CoinReturnService } from '../coin-return/coin-return.service';
import { MessageDisplayService } from '../message-display/message-display.service';

@Injectable()
export class InsertedCoinsService extends CoinsBalance {

  constructor(
    private coinReturnService: CoinReturnService,
    private bankService: BankService,
    private messageDisplayService: MessageDisplayService) {

    super(0, 0, 0);
  }

  insertCoin(coinEnum: CoinsEnum) {
    if (coinEnum === CoinsEnum.NICKLE) {
      this.addCoin(coinEnum);
      this.messageDisplayService.setDisplayBalance(this.ValueInCents / 100);
    }
  }

}
