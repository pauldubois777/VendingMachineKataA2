/* tslint:disable:no-unused-variable */

import { CoinReturnService } from './coin-return.service';
import { CoinsEnum } from '../../shared/coins.enum';

let service: CoinReturnService;

describe('Service: CoinReturn', () => {
  beforeEach(() => {
    service = new CoinReturnService();
  });

  it('after creation should have empty coins array', () => {
    expect(service.Coins.length).toBe(0);
  });

  it('after addToReturn, coins array should have proper coins', () => {
    service.addToReturn(CoinsEnum.DIME);
    service.addToReturn(CoinsEnum.NICKLE);
    service.addToReturn(CoinsEnum.QUARTER);
    service.addToReturn(CoinsEnum.PENNY);

    expect(service.Coins.length).toBe(4);

    expect(service.Coins[0]).toBe(CoinsEnum.DIME);
    expect(service.Coins[1]).toBe(CoinsEnum.NICKLE);
    expect(service.Coins[2]).toBe(CoinsEnum.QUARTER);
    expect(service.Coins[3]).toBe(CoinsEnum.PENNY);
  });

  it('after addToReturn and then emptyReturn, coins array should be empty', () => {
    service.addToReturn(CoinsEnum.DIME);
    service.addToReturn(CoinsEnum.NICKLE);
    service.addToReturn(CoinsEnum.QUARTER);
    service.addToReturn(CoinsEnum.PENNY);

    expect(service.Coins.length).toBe(4);

    service.emptyReturn();

    expect(service.Coins.length).toBe(0);
  });
});
