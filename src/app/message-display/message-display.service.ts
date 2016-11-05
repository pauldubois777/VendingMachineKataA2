// This service represents the machines Message Display area.
import { Injectable } from '@angular/core';

import { StringConstants } from '../shared/string-constants';

@Injectable()
export class MessageDisplayService {
  message: string;
  balance: number;

  constructor() {
    this.message = StringConstants.INSERT_COIN_MESSAGE;
    this.balance = 0;
  }

}
