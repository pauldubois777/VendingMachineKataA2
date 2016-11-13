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

  insertCoin(insertedCoin: CoinsEnum) {
    if (insertedCoin === CoinsEnum.NICKLE || insertedCoin === CoinsEnum.DIME || insertedCoin === CoinsEnum.QUARTER) {
      this.addCoin(insertedCoin);
      this.messageDisplayService.setDisplayBalance(this.ValueInCents / 100);
    } else {
      this.coinReturnService.addToReturn(insertedCoin);
    }
  }

  returnAll() {
    this.returnAllCoinsForDenomination(CoinsEnum.NICKLE);
    this.returnAllCoinsForDenomination(CoinsEnum.DIME);
    this.returnAllCoinsForDenomination(CoinsEnum.QUARTER);
    this.messageDisplayService.setDisplayBalance(0);
  }

  purchase(costInCents: number): boolean {
    if (costInCents > this.ValueInCents) {
      return false;
    }

    let excessAmount = this.ValueInCents - costInCents;

    // User has inserted enough for the purchase, so send all inserted coins to the bank
    this.depositAllCoinsForDenomination(CoinsEnum.NICKLE);
    this.depositAllCoinsForDenomination(CoinsEnum.DIME);
    this.depositAllCoinsForDenomination(CoinsEnum.QUARTER);
    this.messageDisplayService.setDisplayBalance(0);

    // Tell the bank to return any excess amount beyond purchase price
    if (excessAmount > 0) {
      this.bankService.returnThisAmount(excessAmount);
    }

    return true;
  }

private depositAllCoinsForDenomination(coinToReturn: CoinsEnum) {
    let coinCount = this.getCoinBalance(coinToReturn);
    for (let idx = 0; idx < coinCount; idx++) {
      if (this.removeCoin(coinToReturn)) {
        this.bankService.addCoin(coinToReturn);
      }
    }
  }

  private returnAllCoinsForDenomination(coinToReturn: CoinsEnum) {
    let coinCount = this.getCoinBalance(coinToReturn);
    for (let idx = 0; idx < coinCount; idx++) {
      if (this.removeCoin(coinToReturn)) {
        this.coinReturnService.addToReturn(coinToReturn);
      }
    }
  }
}
