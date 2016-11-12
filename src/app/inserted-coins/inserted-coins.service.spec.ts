/* tslint:disable:no-unused-variable */

import { InsertedCoinsService } from './inserted-coins.service';
import { BankService } from '../bank/bank.service';
import { CoinsEnum } from '../shared/coins.enum';
import { CoinReturnService } from '../coin-return/coin-return.service';
import { InitialBankCoins } from '../bank/initial-bank-coins';
import { MessageDisplayService } from '../message-display/message-display.service';

let service: InsertedCoinsService;
let bankService: BankService;
let coinReturnService: CoinReturnService;
let initialBankCoins: InitialBankCoins;
let messageDisplayService: MessageDisplayService;

describe('Service: Inserted Coins', () => {
  beforeEach(() => {
    messageDisplayService = new MessageDisplayService();
    spyOn(messageDisplayService, 'setDisplayBalance');

    initialBankCoins = new InitialBankCoins();
    coinReturnService = new CoinReturnService;
    bankService = new BankService(initialBankCoins, coinReturnService);
    service = new InsertedCoinsService(coinReturnService, bankService, messageDisplayService);
  });

  it('after creation should have initial coin quantities of 0 and value of 0', () => {
    expect(service.getCoinBalance(CoinsEnum.NICKLE)).toEqual(0);
    expect(service.getCoinBalance(CoinsEnum.DIME)).toEqual(0);
    expect(service.getCoinBalance(CoinsEnum.QUARTER)).toEqual(0);
    expect(service.ValueInCents).toEqual(0);
  });

  describe('insertCoin increases coin balance and value, and properly calls MessageDisplay DisplayBalance for', () => {
    it('Nickle', () => {
      service.insertCoin(CoinsEnum.NICKLE);

      expect(service.getCoinBalance(CoinsEnum.NICKLE)).toEqual(1);
      expect(messageDisplayService.setDisplayBalance).toHaveBeenCalled();
      expect(messageDisplayService.setDisplayBalance).toHaveBeenCalledWith(.05);
    });
  });
});
