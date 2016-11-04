/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoinReturnService } from './coin-return.service';

describe('Service: CoinReturn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinReturnService]
    });
  });

  it('should ...', inject([CoinReturnService], (service: CoinReturnService) => {
    expect(service).toBeTruthy();
  }));
});
