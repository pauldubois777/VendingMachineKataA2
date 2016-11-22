import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { BankService } from '../../services/bank/bank.service';
import { CoinsEnum } from '../../shared/coins.enum';

@Component({
  selector: 'vmk-bank-monitor',
  templateUrl: './bank-monitor.component.html',
  styleUrls: ['./bank-monitor.component.css']
})
export class BankMonitorComponent implements OnInit, OnDestroy {
  monitorVisible: boolean = false;
  nickles: number = 0;
  dimes: number = 0;
  quarters: number = 0;

  private _balanceChangedSubscription: Subscription;

  constructor(private _bankService: BankService) {
  }

  ngOnInit() {
    this.setCoinBalances();
    this._balanceChangedSubscription = this._bankService.balanceChangedObservable.subscribe(
      () =>  {
        this.setCoinBalances();
      }
    );
  }

  ngOnDestroy() {
    this._balanceChangedSubscription.unsubscribe();
  }

  setCoinBalances() {
    this.nickles = this._bankService.getCoinBalance(CoinsEnum.NICKLE);
    this.dimes = this._bankService.getCoinBalance(CoinsEnum.DIME);
    this.quarters = this._bankService.getCoinBalance(CoinsEnum.QUARTER);
  }
}
