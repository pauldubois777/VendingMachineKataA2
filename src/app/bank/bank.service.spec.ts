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

  it('CanMakeChange returns true for bank balances that can make change', () => {
    //                                 NICKELS, DIMES, QUARTERS
    expect(testBalanceForCanMakeChange(      4,     0,        0)).toEqual(true);
    expect(testBalanceForCanMakeChange(      5,     0,        0)).toEqual(true);
    expect(testBalanceForCanMakeChange(      2,     1,        0)).toEqual(true);
    expect(testBalanceForCanMakeChange(      3,     1,        0)).toEqual(true);
    expect(testBalanceForCanMakeChange(      2,     2,        0)).toEqual(true);
    expect(testBalanceForCanMakeChange(      1,     2,        0)).toEqual(true);
    expect(testBalanceForCanMakeChange(      1,     3,        0)).toEqual(true);

    // Throw some quartes in to make sure they don't break anything
    expect(testBalanceForCanMakeChange(      1,     2,        4)).toEqual(true);
    expect(testBalanceForCanMakeChange(      1,     3,        5)).toEqual(true);
  });
});

function testBalanceForCanMakeChange(testNickles: number, testDimes: number, testQuarters: number): boolean {
    let initialBankCoins = createInitialBankCoins(4, 0, 0);
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

