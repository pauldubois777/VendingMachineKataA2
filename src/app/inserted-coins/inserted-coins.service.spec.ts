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

    coinReturnService = new CoinReturnService;
    spyOn(coinReturnService, 'addToReturn');

    initialBankCoins = new InitialBankCoins();
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
      testInsertCoin(CoinsEnum.NICKLE, .05);
    });

    it('Dime', () => {
      testInsertCoin(CoinsEnum.DIME, .10);
    });

    it('Quarter', () => {
      testInsertCoin(CoinsEnum.QUARTER, .25);
    });
  });

  it('inserting multiple coins in a row increases coin balance and value, and properly calls MessageDisplay DisplayBalance', () => {
    service.insertCoin(CoinsEnum.QUARTER);
    service.insertCoin(CoinsEnum.NICKLE);
    service.insertCoin(CoinsEnum.NICKLE);
    service.insertCoin(CoinsEnum.DIME);
    service.insertCoin(CoinsEnum.QUARTER);
    service.insertCoin(CoinsEnum.NICKLE);
    service.insertCoin(CoinsEnum.DIME);

    expect(service.getCoinBalance(CoinsEnum.NICKLE)).toEqual(3);
    expect(service.getCoinBalance(CoinsEnum.DIME)).toEqual(2);
    expect(service.getCoinBalance(CoinsEnum.QUARTER)).toEqual(2);
    expect(messageDisplayService.setDisplayBalance).toHaveBeenCalledTimes(7);
    expect(messageDisplayService.setDisplayBalance.calls.allArgs()).toEqual([
      [.25],
      [.30],
      [.35],
      [.45],
      [.70],
      [.75],
      [.85]
    ]);
  });

  describe('inserting invalid coin does not increase coin balances or value, and properly calls Coin Return service for', () => {
    it('Penny', () => {
      testInsertInvalidCoin(CoinsEnum.PENNY);
    });
    it('Unknown Coin', () => {
      testInsertInvalidCoin(CoinsEnum.UNKNOWN);
    });
  });

  describe('calling returnAll() returns all inserted coins, sets value to zero, and calls message display after', () => {
    it('inserting one coin of each denomination', () => {
      service.insertCoin(CoinsEnum.QUARTER);
      service.insertCoin(CoinsEnum.NICKLE);
      service.insertCoin(CoinsEnum.DIME);

      messageDisplayService.setDisplayBalance.calls.reset();

      service.returnAll();

      expect(coinReturnService.addToReturn).toHaveBeenCalledTimes(3);
      expect(coinReturnService.addToReturn.calls.allArgs()).toEqual([
        [CoinsEnum.NICKLE],
        [CoinsEnum.DIME],
        [CoinsEnum.QUARTER]
      ]);
      expect(messageDisplayService.setDisplayBalance).toHaveBeenCalled();
      expect(messageDisplayService.setDisplayBalance).toHaveBeenCalledWith(0);
      expect(service.ValueInCents).toEqual(0);
    });

    it('inserting multiple coins of each denomination', () => {
      service.insertCoin(CoinsEnum.DIME);
      service.insertCoin(CoinsEnum.NICKLE);
      service.insertCoin(CoinsEnum.QUARTER);
      service.insertCoin(CoinsEnum.NICKLE);
      service.insertCoin(CoinsEnum.DIME);
      service.insertCoin(CoinsEnum.QUARTER);
      service.insertCoin(CoinsEnum.NICKLE);
      service.insertCoin(CoinsEnum.DIME);

      messageDisplayService.setDisplayBalance.calls.reset();

      service.returnAll();

      expect(coinReturnService.addToReturn).toHaveBeenCalledTimes(8);
      expect(coinReturnService.addToReturn.calls.allArgs()).toEqual([
        [CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE],
        [CoinsEnum.DIME],
        [CoinsEnum.DIME],
        [CoinsEnum.DIME],
        [CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER]
      ]);
      expect(messageDisplayService.setDisplayBalance).toHaveBeenCalled();
      expect(messageDisplayService.setDisplayBalance).toHaveBeenCalledWith(0);
      expect(service.ValueInCents).toEqual(0);
    });    
  });

});

function testInsertInvalidCoin(insertedCoin: CoinsEnum) {
  service.insertCoin(insertedCoin);

  expect(service.getCoinBalance(CoinsEnum.NICKLE)).toEqual(0);
  expect(service.getCoinBalance(CoinsEnum.DIME)).toEqual(0);
  expect(service.getCoinBalance(CoinsEnum.QUARTER)).toEqual(0);
  expect(messageDisplayService.setDisplayBalance).not.toHaveBeenCalled();
  expect(coinReturnService.addToReturn).toHaveBeenCalledTimes(1);
  expect(coinReturnService.addToReturn).toHaveBeenCalledWith(insertedCoin);
}

function testInsertCoin(insertedCoin: CoinsEnum, messageDisplayValue: number) {
  service.insertCoin(insertedCoin);
  expect(service.getCoinBalance(insertedCoin)).toEqual(1);
  expect(messageDisplayService.setDisplayBalance).toHaveBeenCalled();
  expect(messageDisplayService.setDisplayBalance).toHaveBeenCalledWith(messageDisplayValue);
}
