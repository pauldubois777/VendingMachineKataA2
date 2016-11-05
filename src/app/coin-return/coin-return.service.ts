import { Injectable } from '@angular/core';

import { Coins } from '../models/coins';

@Injectable()
export class CoinReturnService {
  private coins: Coins;

  constructor() {
    this.coins = new Coins();
  }

  getCoins(): Coins {
    return this.coins;
  }

  returnCoins(coinsToReturn: Coins){
    this.coins.addCoins(coinsToReturn);
  }
}
