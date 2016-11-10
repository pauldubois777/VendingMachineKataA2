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

  describe('returnThisAmount returns proper amount when bank has change', () => {
    it('of 2 nickles, 3 dimes, 4 quarters and amount to return is 1 dollar', () => {
      testReturnThisAmount(2, 3, 4, 100, 0, 2, 3, 0, 40, 4,
        [[CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER]]);
    });

    it('of 2 nickels, 3 dimes, 4 quarters and amount to return is 75 cents', () => {
      testReturnThisAmount(2, 3, 4, 75, 0, 2, 3, 1, 65, 3,
        [[CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER],
        [CoinsEnum.QUARTER]]);
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

  expect(coinReturnService.addToReturn).toHaveBeenCalledTimes(expectedTimesAddToReturnCalled);
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
