/* tslint:disable:no-unused-variable */

import { BankService } from './bank.service';
import { CoinsEnum } from '../shared/coins.enum';
import { InitialBankCoins } from './initial-bank-coins';
import { InitialBankCoinsService } from './initial-bank-coins.service';

let service: BankService;

let initialCoinQuantities: Array<number>;
let initialBankCoinsServiceSpy;

describe('Service: Bank', () => {
  beforeEach(() => {
    initialCoinQuantities = new Array<number>();
    initialCoinQuantities[CoinsEnum.NICKLE] = 4;
    initialCoinQuantities[CoinsEnum.DIME] = 3;
    initialCoinQuantities[CoinsEnum.QUARTER] = 2;

    const initialBankCoinsService = new InitialBankCoinsService();
    initialBankCoinsServiceSpy = spyOn(initialBankCoinsService, 'InitialCoins').and.returnValue(initialCoinQuantities);
    service = new BankService(initialBankCoinsService);
  });

  it('after creation should have initial coin quantities', () => {
    expect(service.Coins[CoinsEnum.NICKLE]).toEqual(initialCoinQuantities[CoinsEnum.NICKLE]);
    expect(service.Coins[CoinsEnum.DIME]).toEqual(initialCoinQuantities[CoinsEnum.DIME]);
    expect(service.Coins[CoinsEnum.QUARTER]).toEqual(initialCoinQuantities[CoinsEnum.QUARTER]);
    expect(initialBankCoinsServiceSpy.calls.count()).toBe(1, 'stubbed InitialCoins was called once');
  });
});

