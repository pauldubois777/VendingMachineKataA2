/* tslint:disable:no-unused-variable */

import { InsertedCoinsService } from './inserted-coins.service';
import { BankService } from '../bank/bank.service';
import { CoinsEnum } from '../../shared/coins.enum';
import { CoinReturnService } from '../coin-return/coin-return.service';
import { InitialBankCoins } from '../bank/initial-bank-coins';
import { MessageService } from '../message/message.service';

let service: InsertedCoinsService;
let bankService: BankService;
let coinReturnService: CoinReturnService;
let initialBankCoins: InitialBankCoins;
let messageService: MessageService;
let setBalanceSpy: jasmine.Spy;
let addToReturnSpy: jasmine.Spy;
let returnThisAmountSpy: jasmine.Spy;
let addCoinSpy: jasmine.Spy;

describe('Service: Inserted Coins', () => {
  beforeEach(() => {
    coinReturnService = new CoinReturnService;
    addToReturnSpy = spyOn(coinReturnService, 'addToReturn');

    initialBankCoins = new InitialBankCoins();
    bankService = new BankService(initialBankCoins, coinReturnService);

    messageService = new MessageService(bankService);
    setBalanceSpy = spyOn(messageService, 'setBalance');

    returnThisAmountSpy = spyOn(bankService, 'returnThisAmount');
    addCoinSpy = spyOn(bankService, 'addCoin');

    service = new InsertedCoinsService(coinReturnService, bankService, messageService);
  });

  it('after creation should have initial coin quantities of 0 and value of 0', () => {
    expect(service.getCoinBalance(CoinsEnum.NICKLE)).toEqual(0);
    expect(service.getCoinBalance(CoinsEnum.DIME)).toEqual(0);
    expect(service.getCoinBalance(CoinsEnum.QUARTER)).toEqual(0);
    expect(service.getValueInCents()).toEqual(0);
  });

  describe('insertCoin increases coin balance and value, and properly calls Message Set Balance for', () => {
    it('Nickle', () => {
      testInsertCoin(CoinsEnum.NICKLE, 5);
    });

    it('Dime', () => {
      testInsertCoin(CoinsEnum.DIME, 10);
    });

    it('Quarter', () => {
      testInsertCoin(CoinsEnum.QUARTER, 25);
    });
  });

  it('inserting multiple coins in a row increases coin balance and value, and properly calls Message Set Balance', () => {
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
    expect(setBalanceSpy).toHaveBeenCalledTimes(7);
    expect(setBalanceSpy.calls.allArgs()).toEqual([
      [25],
      [30],
      [35],
      [45],
      [70],
      [75],
      [85]
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

      setBalanceSpy.calls.reset();

      service.returnAll();

      expect(addToReturnSpy).toHaveBeenCalledTimes(3);
      expect(addToReturnSpy.calls.allArgs()).toEqual([
        [CoinsEnum.NICKLE],
        [CoinsEnum.DIME],
        [CoinsEnum.QUARTER]
      ]);
      expect(setBalanceSpy).toHaveBeenCalled();
      expect(setBalanceSpy).toHaveBeenCalledWith(0);
      expect(service.getValueInCents()).toEqual(0);
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

      setBalanceSpy.calls.reset();

      service.returnAll();

      expect(addToReturnSpy).toHaveBeenCalledTimes(8);
      expect(addToReturnSpy.calls.allArgs()).toEqual([
        [CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE],
        [CoinsEnum.DIME],
        [CoinsEnum.DIME],
        [CoinsEnum.DIME],
        [CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER]
      ]);
      expect(setBalanceSpy).toHaveBeenCalled();
      expect(setBalanceSpy).toHaveBeenCalledWith(0);
      expect(service.getValueInCents()).toEqual(0);
    });
  });

  it('calling purchase with amount inserted returns true, deposits coins in bank, and sets display balance to 0', () => {
    service.insertCoin(CoinsEnum.QUARTER);
    service.insertCoin(CoinsEnum.NICKLE);
    service.insertCoin(CoinsEnum.DIME);
    setBalanceSpy.calls.reset();

    let retValue = service.purchase(40);

    expect(retValue).toEqual(true);
    expect(service.getValueInCents()).toEqual(0);
    expect(addCoinSpy).toHaveBeenCalledTimes(3);
    expect(addCoinSpy.calls.allArgs()).toEqual([
      [CoinsEnum.NICKLE],
      [CoinsEnum.DIME],
      [CoinsEnum.QUARTER]
    ]);
    expect(setBalanceSpy).toHaveBeenCalledWith(0);
    expect(returnThisAmountSpy).not.toHaveBeenCalled();
  });

  it('calling purchase with more than amount inserted returns false and does not do anything else', () => {
      service.insertCoin(CoinsEnum.QUARTER);
      service.insertCoin(CoinsEnum.NICKLE);
      service.insertCoin(CoinsEnum.DIME);
      setBalanceSpy.calls.reset();

      let retValue = service.purchase(50);

      expect(retValue).toEqual(false);
      expect(service.getValueInCents()).toEqual(40);
      expect(addCoinSpy).not.toHaveBeenCalled();
      expect(setBalanceSpy).not.toHaveBeenCalled();
      expect(returnThisAmountSpy).not.toHaveBeenCalled();
  });

  it(`calling purchase with less than amount inserted returns true, 
      deposits all coins in bank, 
      sets display balance to 0, 
      and calls bank to return excess`, () => {
    service.insertCoin(CoinsEnum.QUARTER);
    service.insertCoin(CoinsEnum.QUARTER);
    service.insertCoin(CoinsEnum.NICKLE);
    service.insertCoin(CoinsEnum.NICKLE);
    service.insertCoin(CoinsEnum.DIME);
    service.insertCoin(CoinsEnum.DIME);
    service.insertCoin(CoinsEnum.DIME);
    setBalanceSpy.calls.reset();

    let retValue = service.purchase(40);

    expect(retValue).toEqual(true);
    expect(service.getValueInCents()).toEqual(0);
    expect(addCoinSpy).toHaveBeenCalledTimes(7);
    expect(addCoinSpy.calls.allArgs()).toEqual([
      [CoinsEnum.NICKLE],
      [CoinsEnum.NICKLE],
      [CoinsEnum.DIME],
      [CoinsEnum.DIME],
      [CoinsEnum.DIME],
      [CoinsEnum.QUARTER],
      [CoinsEnum.QUARTER]
    ]);
    expect(setBalanceSpy).toHaveBeenCalledWith(0);
    expect(returnThisAmountSpy).toHaveBeenCalledWith(50);
  });
});

function testInsertInvalidCoin(insertedCoin: CoinsEnum) {
  service.insertCoin(insertedCoin);

  expect(service.getCoinBalance(CoinsEnum.NICKLE)).toEqual(0);
  expect(service.getCoinBalance(CoinsEnum.DIME)).toEqual(0);
  expect(service.getCoinBalance(CoinsEnum.QUARTER)).toEqual(0);
  expect(setBalanceSpy).not.toHaveBeenCalled();
  expect(addToReturnSpy).toHaveBeenCalledTimes(1);
  expect(addToReturnSpy).toHaveBeenCalledWith(insertedCoin);
}

function testInsertCoin(insertedCoin: CoinsEnum, insertedCoinValaue: number) {
  service.insertCoin(insertedCoin);
  expect(service.getCoinBalance(insertedCoin)).toEqual(1);
  expect(setBalanceSpy).toHaveBeenCalled();
  expect(setBalanceSpy).toHaveBeenCalledWith(insertedCoinValaue);
}
