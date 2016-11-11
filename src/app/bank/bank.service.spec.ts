/* tslint:disable:no-unused-variable */

import { BankService } from './bank.service';
import { CoinsEnum } from '../shared/coins.enum';
import { InitialBankCoins } from './initial-bank-coins';
import { CoinReturnService } from '../coin-return/coin-return.service';

let service: BankService;
let coinReturnService: CoinReturnService;
let nickles = 5;
let dimes = 10;
let quarters = 11;
let valueInCents = 400;

describe('Service: Bank', () => {
  beforeEach(() => {
    coinReturnService = new CoinReturnService();
  });

  it('after creation should have initial coin quantities and value', () => {
    let initialBankCoins = createInitialBankCoins(nickles, dimes, quarters);

    service = new BankService(initialBankCoins, coinReturnService);
    expect(service.getCoinBalance(CoinsEnum.NICKLE)).toEqual(nickles);
    expect(service.getCoinBalance(CoinsEnum.DIME)).toEqual(dimes);
    expect(service.getCoinBalance(CoinsEnum.QUARTER)).toEqual(quarters);
    expect(service.ValueInCents).toEqual(valueInCents);
  });

  describe('CanMakeChange returns true for bank coin balances that can make change when coin balance has', () => {
    //                                   NICKELS, DIMES, QUARTERS
    it('4 nickles', () => {
      expect(testBalanceForCanMakeChange(4, 0, 0)).toEqual(true);
    });

    it('5 nickles', () => {
      expect(testBalanceForCanMakeChange(5, 0, 0)).toEqual(true);
    });

    it('2 nickles, 1 dime', () => {
      expect(testBalanceForCanMakeChange(2, 1, 0)).toEqual(true);
    });

    it('3 nickles, 1 dime', () => {
      expect(testBalanceForCanMakeChange(3, 1, 0)).toEqual(true);
    });

    it('2 nickles, 2 dimes', () => {
      expect(testBalanceForCanMakeChange(2, 2, 0)).toEqual(true);
    });

    it('1 nickle, 2 dimes', () => {
      expect(testBalanceForCanMakeChange(1, 2, 0)).toEqual(true);
    });

    it('1 nickle, 3 dimes', () => {
      expect(testBalanceForCanMakeChange(1, 3, 0)).toEqual(true);
    });

    it('1 nickle, 2 dimes, 4 quarters', () => {
      expect(testBalanceForCanMakeChange(1, 2, 4)).toEqual(true);
    });

    it('1 nickle, 3 dimes, 4 quarters', () => {
      expect(testBalanceForCanMakeChange(1, 3, 5)).toEqual(true);
    });

    it('10 nickles, 30 dimes, 4 quarters', () => {
      expect(testBalanceForCanMakeChange(10, 30, 100)).toEqual(true);
    });
  });

  describe('CanMakeChange returns false for bank coin balances that cannot make change when coin balance has', () => {
    it('0 nickle, 0 dime, 0 quarter', () => {
      expect(testBalanceForCanMakeChange(      0,     0,        0)).toEqual(false);
    });

    it('0 nickle, 0 dime, 1 quarter', () => {
      expect(testBalanceForCanMakeChange(      0,     0,        1)).toEqual(false);
    });

    it('0 nickle, 1 dime, 0 quarter', () => {
      expect(testBalanceForCanMakeChange(      0,     1,        0)).toEqual(false);
    });

    it('0 nickle, 2 dime, 0 quarter', () => {
      expect(testBalanceForCanMakeChange(      0,     2,        0)).toEqual(false);
    });

    it('0 nickle, 2 dime, 1 quarter', () => {
      expect(testBalanceForCanMakeChange(      0,     2,        1)).toEqual(false);
    });

    it('1 nickle, 0 dime, 0 quarter', () => {
      expect(testBalanceForCanMakeChange(      1,     0,        0)).toEqual(false);
    });

    it('2 nickle, 0 dime, 0 quarter', () => {
      expect(testBalanceForCanMakeChange(      2,     0,        0)).toEqual(false);
    });

    it('2 nickle, 0 dime, 1 quarter', () => {
      expect(testBalanceForCanMakeChange(      2,     0,        1)).toEqual(false);
    });

    it('3 nickle, 0 dime, 0 quarter', () => {
      expect(testBalanceForCanMakeChange(      3,     0,        0)).toEqual(false);
    });

    it('3 nickle, 0 dime, 1 quarter', () => {
      expect(testBalanceForCanMakeChange(      3,     0,        1)).toEqual(false);
    });

  });

  describe('returnThisAmount returns proper amount when bank has change of', () => {

    // All Quarters
    it('2 nickles, 3 dimes, 4 quarters and amount to return is 100 cents', () => {
      testReturnThisAmount(2, 3, 4, 100, 0, 2, 3, 0, 40, 4,
        [[CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER]]);
    });

    // Quarters and a dime
    it('2 nickles, 3 dimes, 4 quarters and amount to return is 85 cents', () => {
      testReturnThisAmount(2, 3, 4, 85, 0, 2, 2, 1, 55, 4,
        [[CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.DIME]]);
    });

    // Quarters, dime, and nickle
    it('2 nickles, 3 dimes, 4 quarters and amount to return is 90 cents', () => {
      testReturnThisAmount(2, 3, 4, 90, 0, 1, 2, 1, 50, 5,
        [[CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.DIME],
        [CoinsEnum.NICKLE]]);
    });

    // Quarters and nickle
    it('2 nickles, 3 dimes, 4 quarters and amount to return is 80 cents', () => {
      testReturnThisAmount(2, 3, 4, 80, 0, 1, 3, 1, 60, 4,
        [[CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.NICKLE]]);
    });

    // Dimes when Quarters
    it('2 nickles, 3 dimes, 4 quarters and amount to return is 20 cents', () => {
      testReturnThisAmount(2, 3, 4, 20, 0, 2, 1, 4, 120, 2,
        [[CoinsEnum.DIME],
        [CoinsEnum.DIME]]);
    });

    // Nickle when Quarters and dimes
    it('2 nickles, 3 dimes, 4 quarters and amount to return is 5 cents', () => {
      testReturnThisAmount(2, 3, 4, 5, 0, 1, 3, 4, 135, 1,
        [[CoinsEnum.NICKLE]]);
    });

    // Dime and nickle when Quarters
    it('2 nickles, 3 dimes, 4 quarters and amount to return is 15 cents', () => {
      testReturnThisAmount(2, 3, 4, 15, 0, 1, 2, 4, 125, 2,
        [[CoinsEnum.DIME],
        [CoinsEnum.NICKLE]]);
    });

    // Dimes no quarter
    it('2 nickles, 6 dimes, 0 quarters and amount to return is 50 cents', () => {
      testReturnThisAmount(2, 6, 0, 50, 0, 2, 1, 0, 20, 5,
        [[CoinsEnum.DIME],
        [CoinsEnum.DIME],
        [CoinsEnum.DIME],
        [CoinsEnum.DIME],
        [CoinsEnum.DIME]]);
    });

    // Dimes and nickle no quarter
    it('2 nickles, 3 dimes, 0 quarters and amount to return is 25 cents', () => {
      testReturnThisAmount(2, 3, 0, 25, 0, 1, 1, 0, 15, 3,
        [[CoinsEnum.DIME],
        [CoinsEnum.DIME],
        [CoinsEnum.NICKLE]]);
    });

    // Nickles no dimes no quarters
    it('10 nickles, 0 dimes, 0 quarters and amount to return is 25 cents', () => {
      testReturnThisAmount(10, 0, 0, 25, 0, 5, 0, 0, 25, 5,
        [[CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE]]);
    });

    // No coins
    it('0 nickles, 0 dimes, 0 quarters and amount to return is 25 cents', () => {
      testReturnThisAmount(0, 0, 0, 25, 25, 0, 0, 0, 0, 0,
        []);
    });

    // Nickle and dime and quarter not enough coins
    it('1 nickles, 1 dimes, 1 quarters and amount to return is 50 cents', () => {
      testReturnThisAmount(1, 1, 1, 50, 10, 0, 0, 0, 0, 3,
        [[CoinsEnum.QUARTER],
        [CoinsEnum.DIME],
        [CoinsEnum.NICKLE]]);
    });

    // Quarters only can't return full amount
    it('0 nickels, 0 dimes, 2 quarters and amount to return is 65 cents', () => {
      testReturnThisAmount(0, 0, 2, 65, 15, 0, 0, 0, 0, 2,
        [[CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER]]);
    });

    // Dimes only can't return full amount
    it('0 nickels, 2 dimes, 0 quarters and amount to return is 50 cents', () => {
      testReturnThisAmount(0, 2, 0, 50, 30, 0, 0, 0, 0, 2,
        [[CoinsEnum.DIME],
        [CoinsEnum.DIME]]);
    });

    // Nickles only can't return full amount
    it('4 nickels, 0 dimes, 0 quarters and amount to return is 50 cents', () => {
      testReturnThisAmount(4, 0, 0, 50, 30, 0, 0, 0, 0, 4,
        [[CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE],
        [CoinsEnum.NICKLE]]);
    });

    // Quarters and Nickles cant return full amount
    it('1 nickels, 0 dimes, 2 quarters and amount to return is 35 cents', () => {
      testReturnThisAmount(1, 0, 2, 35, 5, 0, 0, 1, 25, 2,
        [[CoinsEnum.QUARTER],
        [CoinsEnum.NICKLE]]);
    });

  });
});

function testReturnThisAmount(
  initialNickels: number,
  initialDimes: number,
  initialQuarters: number,
  amountToReturnInCents: number,
  expectedReturnValue: number,
  expectedBalanceNickles: number,
  expectedBalanceDimes: number,
  expectedBalanceQuarters: number,
  expectedValueInCents: number,
  expectedTimesAddToReturnCalled: number,
  expectedAllArgs: Array<Array<CoinsEnum>>) {

  coinReturnService = new CoinReturnService();
  spyOn(coinReturnService, 'addToReturn');
  let initialBankCoins = createInitialBankCoins(initialNickels, initialDimes, initialQuarters);
  service = new BankService(initialBankCoins, coinReturnService);

  expect(service.returnThisAmount(amountToReturnInCents)).toEqual(expectedReturnValue, 'Return value');
  expect(service.getCoinBalance(CoinsEnum.NICKLE)).toEqual(expectedBalanceNickles, 'Nickles');
  expect(service.getCoinBalance(CoinsEnum.DIME)).toEqual(expectedBalanceDimes, 'Dimes');
  expect(service.getCoinBalance(CoinsEnum.QUARTER)).toEqual(expectedBalanceQuarters, 'Quarters');
  expect(service.ValueInCents).toEqual(expectedValueInCents, 'Value in cents');

  if (expectedTimesAddToReturnCalled === 0) {
    expect(coinReturnService.addToReturn).not.toHaveBeenCalled();
  } else {
    expect(coinReturnService.addToReturn).toHaveBeenCalledTimes(expectedTimesAddToReturnCalled);
  }
  expect(coinReturnService.addToReturn.calls.allArgs(0)).toEqual(expectedAllArgs);
}

function testBalanceForCanMakeChange(testNickles: number, testDimes: number, testQuarters: number): boolean {
    let initialBankCoins = createInitialBankCoins(testNickles, testDimes, testQuarters);
    service = new BankService(initialBankCoins, coinReturnService);
    return service.CanMakeChange;
}

function createInitialBankCoins(initialNickles: number, initialDimes: number, initialQuarters: number): InitialBankCoins {
    let initialBankCoins = new InitialBankCoins();
    initialBankCoins.nickles = initialNickles;
    initialBankCoins.dimes = initialDimes;
    initialBankCoins.quarters = initialQuarters;

    return initialBankCoins;
}
