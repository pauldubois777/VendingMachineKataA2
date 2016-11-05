// This service represents the machines Message Display area.
import { Injectable } from '@angular/core';

import { StringConstants } from '../shared/string-constants';

@Injectable()
export class MessageDisplayService {
  displayMessage: string;
  private _displayBalance: number;
  private _exactChangeOnly: boolean;

  constructor() {
    this.DisplayBalance = 0;
    this.ExactChangeOnly = false;
  }

  set DisplayBalance(balance: number) {
    this._displayBalance = balance;
    this.setDisplayMessage();
  }

  set ExactChangeOnly(exactChangeOnly: boolean){
    this._exactChangeOnly = exactChangeOnly;
    this.setDisplayMessage();
  }

  setDisplayMessage(){
    if (this._displayBalance === 0) {
      if (this._exactChangeOnly) {
        this.displayMessage = StringConstants.EXACT_CHANGE_MESSAGE;
      } else {
        this.displayMessage = StringConstants.INSERT_COIN_MESSAGE;
      }
    } else {
      this.displayMessage = '' + this._displayBalance;
    }
  }
}
