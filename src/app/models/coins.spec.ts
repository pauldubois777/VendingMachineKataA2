/* tslint:disable:no-unused-variable */
import { Coins } from '../models/coins';

let coins: Coins;

describe('Model: Coins', () => {
  beforeEach(() => {
    coins = new Coins();
  });

  it('after creation all coins have qty 0', () => {
    expect(coins.nickles).toBe(0);
    expect(coins.dimes).toBe(0);
    expect(coins.quarters).toBe(0);
  });

  it('after creation should have value 0', () => {
    expect(coins.getValue()).toBe(0);
  });
});
