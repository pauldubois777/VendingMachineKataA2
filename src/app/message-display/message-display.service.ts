// This service represents the machines Message Display area.
import { Injectable } from '@angular/core';

import { StringConstants } from '../shared/string-constants';

@Injectable()
export class MessageDisplayService {
  displayMessage: string;
  private displayBalance: number;

  constructor() {
    this.setDisplayBalance(0.00);
  }

  setDisplayBalance(balance: number) {
    this.displayBalance = balance;
    if (this.displayBalance === 0) {
      this.displayMessage = StringConstants.INSERT_COIN_MESSAGE;
    } else {
      this.displayMessage = '' + this.displayBalance;
    }
  }
}
