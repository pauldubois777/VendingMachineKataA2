/* tslint:disable:no-unused-variable */

import { BankService } from './bank.service';
import { CoinsEnum } from '../shared/coins.enum';
import { InitialBankCoins } from './initial-bank-coins';

let service: BankService;
let nickles = 5;
let dimes = 10;
let quarters = 11;
let valueInCents = 400;

describe('Service: Bank', () => {
  beforeEach(() => {
    let initialBankCoins = createInitialBankCoins(nickles, dimes, quarters);
    service = new BankService(initialBankCoins);
  });

  it('after creation should have initial coin quantities and value', () => {
    expect(service.getCoinBalance(CoinsEnum.NICKLE)).toEqual(nickles);
    expect(service.getCoinBalance(CoinsEnum.DIME)).toEqual(dimes);
    expect(service.getCoinBalance(CoinsEnum.QUARTER)).toEqual(quarters);
    expect(service.ValueInCents).toEqual(valueInCents);
  });

  it('CanMakeChange returns true for bank coin balances that can make change', () => {
    //                                 NICKELS, DIMES, QUARTERS
    expect(testBalanceForCanMakeChange(      4,     0,        0)).toEqual(true, '4 nickle');
    expect(testBalanceForCanMakeChange(      5,     0,        0)).toEqual(true, '5 nickle');
    expect(testBalanceForCanMakeChange(      2,     1,        0)).toEqual(true, '2 nickle, 1 dime');
    expect(testBalanceForCanMakeChange(      3,     1,        0)).toEqual(true, '3 nickle, 1 dime');
    expect(testBalanceForCanMakeChange(      2,     2,        0)).toEqual(true, '2 nickle, 2 dime');
    expect(testBalanceForCanMakeChange(      1,     2,        0)).toEqual(true, '1 nickle, 2 dime');
    expect(testBalanceForCanMakeChange(      1,     3,        0)).toEqual(true, '1 nickle, 3 dime');
    expect(testBalanceForCanMakeChange(      1,     2,        4)).toEqual(true, '1 nickle, 2 dime, 4 quarter');
    expect(testBalanceForCanMakeChange(      1,     3,        5)).toEqual(true, '1 nickle, 3 dime, 4 quarter');
    expect(testBalanceForCanMakeChange(      10,   30,      100)).toEqual(true, '10 nickle, 30 dime, 4 quarter');
  });

  it('CanMakeChange returns false for bank coin balances that cannot make change', () => {
    //                                 NICKELS, DIMES, QUARTERS
    expect(testBalanceForCanMakeChange(      0,     0,        0)).toEqual(false, '0 nickle, 0 dime, 0 quarter');
    expect(testBalanceForCanMakeChange(      0,     0,        1)).toEqual(false, '0 nickle, 0 dime, 1 quarter');
    expect(testBalanceForCanMakeChange(      0,     1,        0)).toEqual(false, '0 nickle, 1 dime, 0 quarter');
    expect(testBalanceForCanMakeChange(      0,     2,        0)).toEqual(false, '0 nickle, 2 dime, 0 quarter');
    expect(testBalanceForCanMakeChange(      0,     2,        1)).toEqual(false, '0 nickle, 2 dime, 1 quarter');
    expect(testBalanceForCanMakeChange(      1,     0,        0)).toEqual(false, '1 nickle, 0 dime, 0 quarter');
    expect(testBalanceForCanMakeChange(      2,     0,        0)).toEqual(false, '2 nickle, 0 dime, 0 quarter');
    expect(testBalanceForCanMakeChange(      2,     0,        1)).toEqual(false, '2 nickle, 0 dime, 1 quarter');
    expect(testBalanceForCanMakeChange(      3,     0,        0)).toEqual(false, '3 nickle, 0 dime, 0 quarter');
    expect(testBalanceForCanMakeChange(      3,     0,        1)).toEqual(false, '3 nickle, 0 dime, 1 quarter');
  });
});

function testBalanceForCanMakeChange(testNickles: number, testDimes: number, testQuarters: number): boolean {
    let initialBankCoins = createInitialBankCoins(testNickles, testDimes, testQuarters);
    service = new BankService(initialBankCoins);
    return service.CanMakeChange;
}

function createInitialBankCoins(initialNickles: number, initialDimes: number, initialQuarters: number): InitialBankCoins {
    let initialBankCoins = new InitialBankCoins();
    initialBankCoins.nickles = initialNickles;
    initialBankCoins.dimes = initialDimes;
    initialBankCoins.quarters = initialQuarters;

    return initialBankCoins;
}

