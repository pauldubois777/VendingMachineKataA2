/* tslint:disable:no-unused-variable */


import { MessageDisplayService } from './message-display.service';
import { StringConstants } from '../shared/string-constants';
import { NumericConstants } from '../shared/numeric-constants';

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

  it('after setting DisplayBalance to non zero amount and set DisplayBalance back to zero, message should be insert coins message', () => {
    service.DisplayBalance = 1.25;
    expect(service.displayMessage).toBe('1.25');
    service.DisplayBalance = 0;
    expect(service.displayMessage).toBe(StringConstants.INSERT_COIN_MESSAGE);
  });

  it('after setting ExactChangeOnly to true and balance to zero, message should be exact change message', () => {
    service.ExactChangeOnly = true;
    service.DisplayBalance = 0;
    expect(service.displayMessage).toBe(StringConstants.EXACT_CHANGE_MESSAGE);
  });

  it('after setting TempMessage, message should be the temp message that was set', () => {
    let tempMessage = 'This is a temp message';
    service.TempMessage = tempMessage;
    expect(service.displayMessage).toBe(tempMessage);
  });

  it('after setting TempMessage, message should revert after timeout duration', (done) => {
    let tempMessage = 'This is a temp message';
    service.TempMessage = tempMessage;
    setTimeout( () => {
      expect(service.displayMessage).toBe(StringConstants.INSERT_COIN_MESSAGE);
      done();
    }, NumericConstants.TEMP_MESSAGE_DURATION_MS);
  });

  it('setting temp message and setting it again before timeout should change message', () => {
    let tempMessageOne = 'This is a temp message ONE';
    service.TempMessage = tempMessageOne;
    let tempMessageTwo = 'This is a temp message TWO';
    service.TempMessage = tempMessageTwo;
    expect(service.displayMessage).toBe(tempMessageTwo);
  });
});
