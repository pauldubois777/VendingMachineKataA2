/* tslint:disable:no-unused-variable */
import { MessageDisplayService } from './message-display.service';
import { StringConstants } from '../shared/string-constants';

let service: MessageDisplayService;

describe('Service: MessageDisplay', () => {
  beforeEach(() => {
    service = new MessageDisplayService();
  });

  it('after creation message should be insert coins message', () => {
    expect(service.displayMessage).toBe(StringConstants.INSERT_COIN_MESSAGE);
  });

  it('after setting DisplayBalance to non zero amount, message should be balance amount', () => {
    service.DisplayBalance = 1.25;
    expect(service.displayMessage).toBe('1.25');
  });

  it('after setting DisplayBalance to non zero amount, and then setDisplayBalance back to zero, message should be insert coins message', () => {
    service.DisplayBalance = 1.25;
    expect(service.displayMessage).toBe('1.25');
    service.DisplayBalance = 0;
    expect(service.displayMessage).toBe(StringConstants.INSERT_COIN_MESSAGE);
  });

  it('after setting ExactChangeOnly to true and balance to zero, message should be exact change message', () => {
    service.DisplayBalance = 0;
    service.ExactChangeOnly = true;
    expect(service.displayMessage).toBe(StringConstants.EXACT_CHANGE_MESSAGE);
  });
});
