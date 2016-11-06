// This service represents the machines Message Display area.
import { Injectable } from '@angular/core';

import { StringConstants } from '../shared/string-constants';

@Injectable()
export class MessageDisplayService {
  displayMessage: string;
  private _displayBalance: number;
  private _exactChangeOnly: boolean;
  private _tempMessage: string;

  constructor() {
    this._displayBalance = 0;
    this._exactChangeOnly = false;
    this._tempMessage = '';
    this.setDisplayMessage();
  }

  set DisplayBalance(balance: number) {
    this._displayBalance = balance;
    this.setDisplayMessage();
  }

  set ExactChangeOnly(exactChangeOnly: boolean){
    this._exactChangeOnly = exactChangeOnly;
    this.setDisplayMessage();
  }

  set TempMessage(tempMessage: string){
    this._tempMessage = tempMessage;
    this.setDisplayMessage();
  }

  setDisplayMessage() {
    if (this._tempMessage) {
      this.displayMessage = this._tempMessage;
    } else {
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
}
