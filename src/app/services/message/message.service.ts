// This service represents the machines Message Display area.
import { Injectable, EventEmitter } from '@angular/core';

import { StringConstants } from '../../shared/string-constants';
import { NumericConstants } from '../../shared/numeric-constants';

@Injectable()
export class MessageService {
  currentMessageObservable = new EventEmitter<string>();
  currentMessage: string;
  private _displayBalance: number;
  private _exactChangeOnly: boolean;
  private _tempMessage: string;
  private _tempMsgTimer: NodeJS.Timer;

  constructor() {
    this._displayBalance = 0;
    this._exactChangeOnly = false;
    this._tempMessage = '';
    this.setCurrentMessage();
  }

  setDisplayBalance(balance: number) {
    this._displayBalance = balance;
    this.setCurrentMessage();
  }

  set ExactChangeOnly(exactChangeOnly: boolean) {
    this._exactChangeOnly = exactChangeOnly;
    this.setCurrentMessage();
  }

  setTempMessage(tempMessage: string) {
    // Cancel any previous temp message that is being displayed
    if (this._tempMsgTimer) {
      clearTimeout(this._tempMsgTimer);
    }

    // Set the new temp message
    this._tempMessage = tempMessage;
    this.setCurrentMessage();

    // Set the timer for the temp message so it will be cleared
    this._tempMsgTimer = setTimeout( () => {
      this._tempMessage = '';
      this.setCurrentMessage();
    }, NumericConstants.TEMP_MESSAGE_DURATION_MS);
  }

  private setCurrentMessage() {
    if (this._tempMessage) {
      this.currentMessage = this._tempMessage;
    } else {
      if (this._displayBalance === 0) {
        if (this._exactChangeOnly) {
          this.currentMessage = StringConstants.EXACT_CHANGE_MESSAGE;
        } else {
          this.currentMessage = StringConstants.INSERT_COIN_MESSAGE;
        }
      } else {
        this.currentMessage = '' + this._displayBalance;
      }
    }

    this.currentMessageObservable.emit(this.currentMessage);
  }
}
