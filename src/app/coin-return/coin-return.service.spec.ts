/* tslint:disable:no-unused-variable */

import { CoinReturnService } from './coin-return.service';
import { Coins } from '../models/coins';

let service: CoinReturnService;

describe('Service: CoinReturn', () => {
  beforeEach(() => {
    service = new CoinReturnService();
  });

  it('after creation should have coins with all quantities 0 and value 0', () => {
    let coins = service.Coins;
    expect(coins.nickles).toBe(0);
    expect(coins.dimes).toBe(0);
    expect(coins.quarters).toBe(0);
    expect(coins.getValue()).toBe(0);
  });

  it('after addToReturn, coins should have proper quantities and value', () => {
    let coinsToReturn = new Coins(3, 4, 5);
    service.addToReturn(coinsToReturn);
    let coins = service.Coins;

    expect(coins.nickles).toBe(3);
    expect(coins.dimes).toBe(4);
    expect(coins.quarters).toBe(5);
    expect(coins.getValue()).toBe(1.80);
  });

  it('after addToReturn and then emptyReturn, coins should all have qty 0 with value 0 ', () => {
    let coinsToReturn = new Coins(3, 4, 5);
    service.addToReturn(coinsToReturn);
    service.emptyReturn();
    let coins = service.Coins;

    expect(coins.nickles).toBe(0);
    expect(coins.dimes).toBe(0);
    expect(coins.quarters).toBe(0);
    expect(coins.getValue()).toBe(0);
  });
});
