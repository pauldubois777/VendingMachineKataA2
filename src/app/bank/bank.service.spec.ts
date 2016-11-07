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
    let initialBankCoins = new InitialBankCoins();
    initialBankCoins.nickles = nickles;
    initialBankCoins.dimes = dimes;
    initialBankCoins.quarters = quarters;

    service = new BankService(initialBankCoins);
  });

  it('after creation should have initial coin quantities and value', () => {
    expect(service.getCoinBalance(CoinsEnum.NICKLE)).toEqual(nickles);
    expect(service.getCoinBalance(CoinsEnum.DIME)).toEqual(dimes);
    expect(service.getCoinBalance(CoinsEnum.QUARTER)).toEqual(quarters);
    expect(service.ValueInCents).toEqual(valueInCents);
  });
});

