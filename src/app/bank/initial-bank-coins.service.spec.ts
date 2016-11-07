/* tslint:disable:no-unused-variable */

import { InitialBankCoinsService } from './initial-bank-coins.service';
import { InitialBankCoins } from './initial-bank-coins';
import { CoinsEnum } from '../shared/coins.enum';

let service: InitialBankCoinsService;

describe('Service: IntialBankCoinsService', () => {
  beforeEach(() => {
    service = new InitialBankCoinsService();
  });

  it('after creation should have initial bank coins', () => {
    expect(service.InitialCoins[CoinsEnum.NICKLE]).toEqual(InitialBankCoins[CoinsEnum.NICKLE]);
    expect(service.InitialCoins[CoinsEnum.DIME]).toEqual(InitialBankCoins[CoinsEnum.DIME]);
    expect(service.InitialCoins[CoinsEnum.QUARTER]).toEqual(InitialBankCoins[CoinsEnum.QUARTER]);
  });
});
