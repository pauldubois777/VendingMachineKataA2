/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { CoinReturnAreaComponent } from './coin-return-area.component';
import { CoinReturnService } from '../../services/coin-return/coin-return.service';

describe('Component: CoinReturnArea', () => {
  it('should create an instance', () => {
    let coinReturnService = new CoinReturnService();

    let component = new CoinReturnAreaComponent(coinReturnService);
    expect(component).toBeTruthy();
  });
});
