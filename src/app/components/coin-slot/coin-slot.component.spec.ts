/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { CoinSlotComponent } from './coin-slot.component';
import { InsertedCoinsService } from '../../services/inserted-coins/inserted-coins.service';
import { CoinReturnService } from '../../services/coin-return/coin-return.service';
import { BankService } from '../../services/bank/bank.service';
import { InitialBankCoins } from '../../services/bank/initial-bank-coins';
import { MessageService } from '../../services/message/message.service';

describe('Component: CoinSlot', () => {
  it('should create an instance', () => {
    let coinReturnService = new CoinReturnService();
    let bankService = new BankService(new InitialBankCoins, coinReturnService);
    let messageService = new MessageService();
    let insertedCoinService = new InsertedCoinsService(coinReturnService, bankService, messageService);

    let component = new CoinSlotComponent(insertedCoinService);
    expect(component).toBeTruthy();
  });
});
