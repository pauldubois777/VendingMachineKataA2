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
    service.setDisplayBalance(1.25);
    expect(service.displayMessage).toBe('1.25');
  });

  it('after setting DisplayBalance to non zero amount and set DisplayBalance back to zero, message should be insert coins message', () => {
    service.setDisplayBalance(1.25);
    expect(service.displayMessage).toBe('1.25');
    service.setDisplayBalance(0);
    expect(service.displayMessage).toBe(StringConstants.INSERT_COIN_MESSAGE);
  });

  it('after setting ExactChangeOnly to true and balance to zero, message should be exact change message', () => {
    service.ExactChangeOnly = true;
    service.setDisplayBalance(0);
    expect(service.displayMessage).toBe(StringConstants.EXACT_CHANGE_MESSAGE);
  });

  it('after setting TempMessage, message should be the temp message that was set', () => {
    let tempMessage = 'This is a temp message';
    service.setTempMessage(tempMessage);
    expect(service.displayMessage).toBe(tempMessage);
  });

  it('after setting TempMessage, message should revert after timeout duration', (done) => {
    let tempMessage = 'This is a temp message';
    service.setTempMessage(tempMessage);
    setTimeout( () => {
      expect(service.displayMessage).toBe(StringConstants.INSERT_COIN_MESSAGE);
      done();
    }, NumericConstants.TEMP_MESSAGE_DURATION_MS);
  });

  it('setting temp message and setting it again before timeout should change message', () => {
    let tempMessageOne = 'This is a temp message ONE';
    service.setTempMessage(tempMessageOne);
    let tempMessageTwo = 'This is a temp message TWO';
    service.setTempMessage(tempMessageTwo);
    expect(service.displayMessage).toBe(tempMessageTwo);
  });

  it('setting temp message then immediately setting balance to non zero should not change temp message', () => {
    let tempMessage = 'This is a temp message';
    service.setTempMessage(tempMessage);
    service.setDisplayBalance(1.50);
    expect(service.displayMessage).toBe(tempMessage);
  });


  it('setting temp message then setting balance to non zero should show balance after temp message expires', (done) => {
    let tempMessage = 'This is a temp message';
    service.setTempMessage(tempMessage);
    service.setDisplayBalance(1.05);
    setTimeout( () => {
      expect(service.displayMessage).toBe('1.05');
      done();
    }, NumericConstants.TEMP_MESSAGE_DURATION_MS);
  });
});
