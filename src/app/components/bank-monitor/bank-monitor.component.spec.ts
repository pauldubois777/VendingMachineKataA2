/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { BankMonitorComponent } from './bank-monitor.component';

import { BankService } from '../../services/bank/bank.service';
import { InitialBankCoins } from '../../services/bank/initial-bank-coins';
import { CoinReturnService } from '../../services/coin-return/coin-return.service';

describe('Component: BankMonitor', () => {
  it('should create an instance', () => {
    let initialBankCoins = new InitialBankCoins();
    let coinReturnService = new CoinReturnService();
    let bankService = new BankService(initialBankCoins, coinReturnService);

    let component = new BankMonitorComponent(bankService);
    expect(component).toBeTruthy();
  });
});
