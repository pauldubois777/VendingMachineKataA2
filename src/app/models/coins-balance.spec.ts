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
    expect(coinsBalance.ValueInCents).toEqual(0);
  });

  it('after creation with coin parameters, all coins have correct qty and value is correct', () => {
    coinsBalance = new CoinsBalance(nickles, dimes, quarters);
    expect(coinsBalance.getCoinBalance(CoinsEnum.NICKLE)).toEqual(nickles);
    expect(coinsBalance.getCoinBalance(CoinsEnum.DIME)).toEqual(dimes);
    expect(coinsBalance.getCoinBalance(CoinsEnum.QUARTER)).toEqual(quarters);
    expect(coinsBalance.ValueInCents).toEqual(valueInCents);
  });

  it('adding valid coins returns true and updates qty and value correctly', () => {
    testAddCoin(CoinsEnum.NICKLE, true, 5);
    testAddCoin(CoinsEnum.DIME, true, 15);
    testAddCoin(CoinsEnum.QUARTER, true, 40);
  });
});

function testAddCoin(coinEnum: CoinsEnum, expectedRetValue: boolean, expectedValue: number) {
  let retVal = coinsBalance.addCoin(coinEnum);
  expect(retVal).toEqual(expectedRetValue);
  expect(coinsBalance.getCoinBalance(coinEnum)).toEqual(1);
  expect(coinsBalance.ValueInCents).toEqual(expectedValue);
}
