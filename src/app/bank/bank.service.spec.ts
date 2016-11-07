/* tslint:disable:no-unused-variable */

import { BankService } from './bank.service';
import { CoinsEnum } from '../shared/coins.enum';
import { InitialBankCoins } from '../shared/initial-bank-coins';

let service: BankService;

describe('Service: Bank', () => {
  beforeEach(() => {
    service = new BankService();
  });

  it('after creation should have initial coin quantities', () => {
    expect(service.Coins[CoinsEnum.NICKLE]).toEqual(InitialBankCoins[CoinsEnum.NICKLE]);
    expect(service.Coins[CoinsEnum.DIME]).toEqual(InitialBankCoins[CoinsEnum.DIME]);
    expect(service.Coins[CoinsEnum.QUARTER]).toEqual(InitialBankCoins[CoinsEnum.QUARTER]);
  });
});

