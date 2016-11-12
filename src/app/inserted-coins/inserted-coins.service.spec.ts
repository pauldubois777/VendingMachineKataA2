/* tslint:disable:no-unused-variable */

import { InsertedCoinsService } from './inserted-coins.service';
import { BankService } from '../bank/bank.service';
import { CoinsEnum } from '../shared/coins.enum';
import { CoinReturnService } from '../coin-return/coin-return.service';
import { InitialBankCoins } from '../bank/initial-bank-coins';

let service: InsertedCoinsService;
let bankService: BankService;
let coinReturnService: CoinReturnService;
let initialBankCoins: InitialBankCoins;

describe('Service: Inserted Coins', () => {
  beforeEach(() => {
    initialBankCoins = new InitialBankCoins();
    coinReturnService = new CoinReturnService;
    bankService = new BankService(initialBankCoins, coinReturnService);
    service = new InsertedCoinsService(coinReturnService, bankService);
  });
});
