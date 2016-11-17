import { CoinsBalance } from './coins-balance';
import { CoinsEnum } from '../shared/coins.enum';

let coinsBalance: CoinsBalance;
let nickles = 5;
let dimes = 10;
let quarters = 11;
let valueInCents = 400;

describe('Model: CoinsBalance', () => {
  beforeEach(() => {
    coinsBalance = new CoinsBalance();
  });

  it('after creation with no parameters, all coins have zero qty and balance 0', () => {
    expect(coinsBalance.getCoinBalance(CoinsEnum.NICKLE)).toEqual(0);
    expect(coinsBalance.getCoinBalance(CoinsEnum.DIME)).toEqual(0);
    expect(coinsBalance.getCoinBalance(CoinsEnum.QUARTER)).toEqual(0);
    expect(coinsBalance.getValueInCents()).toEqual(0);
  });

  it('after creation with coin parameters, all coins have correct qty and value is correct', () => {
    coinsBalance = new CoinsBalance(nickles, dimes, quarters);
    expect(coinsBalance.getCoinBalance(CoinsEnum.NICKLE)).toEqual(nickles);
    expect(coinsBalance.getCoinBalance(CoinsEnum.DIME)).toEqual(dimes);
    expect(coinsBalance.getCoinBalance(CoinsEnum.QUARTER)).toEqual(quarters);
    expect(coinsBalance.getValueInCents()).toEqual(valueInCents);
  });

  it('calling reset sets all coin qtys to zero and value is zero', () => {
    coinsBalance = new CoinsBalance(nickles, dimes, quarters);
    coinsBalance.reset();
    expect(coinsBalance.getCoinBalance(CoinsEnum.NICKLE)).toEqual(0);
    expect(coinsBalance.getCoinBalance(CoinsEnum.DIME)).toEqual(0);
    expect(coinsBalance.getCoinBalance(CoinsEnum.QUARTER)).toEqual(0);
    expect(coinsBalance.getValueInCents()).toEqual(0);
  });

  it('adding valid coins returns true and updates qty and value correctly', () => {
    testAddCoin(CoinsEnum.NICKLE, true, 1, 5);
    testAddCoin(CoinsEnum.DIME, true, 1, 15);
    testAddCoin(CoinsEnum.QUARTER, true, 1, 40);
  });

  it('adding invalid coins returns false, does not update qtys, and value stays zero', () => {
    testAddCoin(CoinsEnum.PENNY, false, 0, 0);
    testAddCoin(CoinsEnum.UNKNOWN, false, 0, 0);
  });

  it('removing valid coins returns true and updates qty and value correctly', () => {
    coinsBalance = new CoinsBalance(nickles, dimes, quarters);
    testRemoveCoin(CoinsEnum.NICKLE, true, nickles - 1, valueInCents - 5);
    testRemoveCoin(CoinsEnum.DIME, true, dimes - 1, valueInCents - 15);
    testRemoveCoin(CoinsEnum.QUARTER, true, quarters - 1, valueInCents - 40);
  });

  it('removing invalid coins returns false and does not update qty or value', () => {
    coinsBalance = new CoinsBalance(nickles, dimes, quarters);
    testRemoveCoin(CoinsEnum.PENNY, false, 0, valueInCents);
    testRemoveCoin(CoinsEnum.UNKNOWN, false, 0, valueInCents);
  });

  it('removing valid coin with qty zero returns false and does not update qty or value', () => {
    coinsBalance = new CoinsBalance(0, 0, 0);
    testRemoveCoin(CoinsEnum.NICKLE, false, 0, 0);
    testRemoveCoin(CoinsEnum.DIME, false, 0, 0);
    testRemoveCoin(CoinsEnum.QUARTER, false, 0, 0);
  });
});

function testAddCoin(coinEnum: CoinsEnum, expectedRetValue: boolean, coinQty: number, expectedValue: number) {
  let retVal = coinsBalance['addCoin'](coinEnum);
  expect(retVal).toEqual(expectedRetValue);
  expect(coinsBalance.getCoinBalance(coinEnum)).toEqual(coinQty);
  expect(coinsBalance.getValueInCents()).toEqual(expectedValue);
}

function testRemoveCoin(coinEnum: CoinsEnum, expectedRetValue: boolean, coinQty: number, expectedValue: number) {
  let retVal = coinsBalance.removeCoin(coinEnum);
  expect(retVal).toEqual(expectedRetValue);
  expect(coinsBalance.getCoinBalance(coinEnum)).toEqual(coinQty);
  expect(coinsBalance.getValueInCents()).toEqual(expectedValue);
}
