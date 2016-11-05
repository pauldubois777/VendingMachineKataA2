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

  emptyReturn(){
    this.coins.nickles = 0;
    this.coins.dimes = 0;
    this.coins.quarters = 0;
  }
}
