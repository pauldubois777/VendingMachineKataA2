/* tslint:disable:no-unused-variable */
import { MessageDisplayService } from './message-display.service';
import { StringConstants } from '../shared/string-constants';

let service: MessageDisplayService;

describe('Service: MessageDisplay', () => {
  beforeEach(() => {
    service = new MessageDisplayService();
  });

  it('after creation message should be insert coins message and balance = 0', () => {
    expect(service.message).toBe(StringConstants.INSERT_COIN_MESSAGE);
    expect(service.balance).toBe(0);
  });

});
