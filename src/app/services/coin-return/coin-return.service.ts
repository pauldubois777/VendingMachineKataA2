// This service represent the machine's Coin Return area.
// Other services can add coins to the return, or allow the user to empty the return.
// This class cannot extend the CoinsBalance class because the Coin Return can have pennys as well as 
// unknown coins
import { Injectable, EventEmitter } from '@angular/core';

import { CoinsEnum } from '../../shared/coins.enum';

@Injectable()
export class CoinReturnService {
  coinsObservable = new EventEmitter<Array<CoinsEnum>>();
  private _coins: Array<CoinsEnum>;

  constructor() {
    this._coins = new Array<CoinsEnum>();
  }

  get Coins(): Array<CoinsEnum> {
    return this._coins.slice(0);
  }

  addToReturn(coin: CoinsEnum) {
    this._coins.push(coin);
    this.coinsObservable.emit(this._coins);
  }

  emptyReturn() {
    this._coins.splice(0);
    this.coinsObservable.emit(this._coins);
  }
}
