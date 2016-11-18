import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { CoinReturnService } from '../../services/coin-return/coin-return.service';
import { CoinsEnum } from '../../shared/coins.enum';

@Component({
  selector: 'vmk-coin-return-area',
  templateUrl: './coin-return-area.component.html',
  styleUrls: ['./coin-return-area.component.css']
})
export class CoinReturnAreaComponent implements OnInit, OnDestroy {
  coinsInReturn: Array<CoinsEnum> = [];
  private _coinsSubscription: Subscription;

  constructor(private _coinReturnService: CoinReturnService) { }

  onTakeCoins() {
    this._coinReturnService.emptyReturn();
  }

  ngOnInit() {
    this._coinsSubscription = this._coinReturnService.coinsObservable.subscribe(
      (coins: Array<CoinsEnum>) =>  {
        this.coinsInReturn = coins;
      }
    );
  }
  ngOnDestroy() {
    this._coinsSubscription.unsubscribe();
  }

}
