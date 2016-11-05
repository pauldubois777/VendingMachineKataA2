/* tslint:disable:no-unused-variable */
// import { TestBed, async, inject } from '@angular/core/testing';

import { CoinReturnService } from './coin-return.service';
import { Coins } from '../models/coins';

let service: CoinReturnService;

describe('Service: CoinReturn', () => {
  beforeEach(() => {
    service = new CoinReturnService();
  });

  it('after creation should have coins with all quantities 0', () => {
    let coins: Coins = service.getCoins();
    expect(coins.nickles).toBe(0);
    expect(coins.dimes).toBe(0);
    expect(coins.quarters).toBe(0);
  });

  it('after creation should have coins with value 0', () => {
    let coins: Coins = service.getCoins();
    expect(coins.getValue()).toBe(0);
  });
});
