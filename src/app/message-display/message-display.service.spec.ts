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

  it('after setDisplayBalance to non zero amount, message should be balance amount', () => {
    service.setDisplayBalance(1.25);
    expect(service.displayMessage).toBe('1.25');
  });

  it('after setDisplayBalance to non zero amount, and then setDisplayBalance back to zero, message should be insert coins message', () => {
    service.setDisplayBalance(1.25);
    expect(service.displayMessage).toBe('1.25');
    service.setDisplayBalance(0);
    expect(service.displayMessage).toBe(StringConstants.INSERT_COIN_MESSAGE);
  });

});
