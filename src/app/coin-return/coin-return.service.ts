// This service represent the machine's Coin Return area.
// Other services can add coins to the return, or allow the user to empty the return.

import { Injectable } from '@angular/core';

import { Coins } from '../models/coins';

@Injectable()
export class CoinReturnService {
  private _coins: Coins;

  constructor() {
    this._coins = new Coins();
  }

  get Coins(): Coins {
    return this._coins;
  }

  addToReturn(coinsToReturn: Coins) {
    this._coins.addCoins(coinsToReturn);
  }

  emptyReturn() {
    this._coins.nickles = 0;
    this._coins.dimes = 0;
    this._coins.quarters = 0;
  }
}
