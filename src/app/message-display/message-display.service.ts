// This service represents the machines Message Display area.
import { Injectable } from '@angular/core';

import { StringConstants } from '../shared/string-constants';
import { NumericConstants } from '../shared/numeric-constants';

@Injectable()
export class MessageDisplayService {
  displayMessage: string;
  private _displayBalance: number;
  private _exactChangeOnly: boolean;
  private _tempMessage: string;
  private _tempMsgTimer: NodeJS.Timer;

  constructor() {
    this._displayBalance = 0;
    this._exactChangeOnly = false;
    this._tempMessage = '';
    this.setDisplayMessage();
  }

  setDisplayBalance(balance: number) {
    this._displayBalance = balance;
    this.setDisplayMessage();
  }

  set ExactChangeOnly(exactChangeOnly: boolean){
    this._exactChangeOnly = exactChangeOnly;
    this.setDisplayMessage();
  }

  set TempMessage(tempMessage: string){
    // Cancel any previous temp message that is being displayed
    if (this._tempMsgTimer) {
      clearTimeout(this._tempMsgTimer);
    }

    // Set the new temp message
    this._tempMessage = tempMessage;
    this.setDisplayMessage();

    // Set the timer for the temp message so it will be cleared
    this._tempMsgTimer = setTimeout( () => {
      this._tempMessage = '';
      this.setDisplayMessage();
    }, NumericConstants.TEMP_MESSAGE_DURATION_MS);
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
