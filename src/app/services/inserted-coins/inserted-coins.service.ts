import { Injectable } from '@angular/core';

import { CoinsBalance } from '../../models/coins-balance';
import { CoinsEnum } from '../../shared/coins.enum';
import { BankService } from '../bank/bank.service';
import { CoinReturnService } from '../coin-return/coin-return.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class InsertedCoinsService extends CoinsBalance {

  constructor(
    private _coinReturnService: CoinReturnService,
    private _bankService: BankService,
    private _messageService: MessageService) {

    super(0, 0, 0);
  }

  insertCoin(insertedCoin: CoinsEnum) {
    if (insertedCoin === CoinsEnum.NICKLE || insertedCoin === CoinsEnum.DIME || insertedCoin === CoinsEnum.QUARTER) {
      this.addCoin(insertedCoin);
      this._messageService.setDisplayBalance(this.getValueInCents() / 100);
    } else {
      this._coinReturnService.addToReturn(insertedCoin);
    }
  }

  returnAll() {
    this.returnAllCoinsForDenomination(CoinsEnum.NICKLE);
    this.returnAllCoinsForDenomination(CoinsEnum.DIME);
    this.returnAllCoinsForDenomination(CoinsEnum.QUARTER);
    this._messageService.setDisplayBalance(0);
  }

  purchase(costInCents: number): boolean {
    if (costInCents > this.getValueInCents()) {
      return false;
    }

    let excessAmount = this.getValueInCents() - costInCents;

    // User has inserted enough for the purchase, so send all inserted coins to the bank
    this.depositAllCoinsForDenomination(CoinsEnum.NICKLE);
    this.depositAllCoinsForDenomination(CoinsEnum.DIME);
    this.depositAllCoinsForDenomination(CoinsEnum.QUARTER);
    this._messageService.setDisplayBalance(0);

    // Tell the bank to return any excess amount beyond purchase price
    if (excessAmount > 0) {
      this._bankService.returnThisAmount(excessAmount);
    }

    return true;
  }

private depositAllCoinsForDenomination(coinToReturn: CoinsEnum) {
    let coinCount = this.getCoinBalance(coinToReturn);
    for (let idx = 0; idx < coinCount; idx++) {
      if (this.removeCoin(coinToReturn)) {
        this._bankService.addCoin(coinToReturn);
      }
    }
  }

  private returnAllCoinsForDenomination(coinToReturn: CoinsEnum) {
    let coinCount = this.getCoinBalance(coinToReturn);
    for (let idx = 0; idx < coinCount; idx++) {
      if (this.removeCoin(coinToReturn)) {
        this._coinReturnService.addToReturn(coinToReturn);
      }
    }
  }
}
