/* tslint:disable:no-unused-variable */

// TODO: Add tests for currentMessageObservable

import { MessageService } from './message.service';
import { StringConstants } from '../../shared/string-constants';
import { NumericConstants } from '../../shared/numeric-constants';
import { formatPrice } from '../../shared/helpers';

let service: MessageService;

describe('Service: MessageDisplay', () => {
  beforeEach(() => {
    service = new MessageService();
  });

  it('after creation message should be insert coins message', () => {
    expect(service.currentMessage).toBe(StringConstants.INSERT_COIN_MESSAGE);
  });

  it('after setting DisplayBalance to non zero amount, message should be balance amount', () => {
    service.setBalance(125);
    expect(service.currentMessage).toBe(formatPrice(125));
  });

  it('after setting DisplayBalance to non zero amount and set DisplayBalance back to zero, message should be insert coins message', () => {
    service.setBalance(125);
    expect(service.currentMessage).toBe(formatPrice(125));
    service.setBalance(0);
    expect(service.currentMessage).toBe(StringConstants.INSERT_COIN_MESSAGE);
  });

  it('after setting ExactChangeOnly to true and balance to zero, message should be exact change message', () => {
    service.ExactChangeOnly = true;
    service.setBalance(0);
    expect(service.currentMessage).toBe(StringConstants.EXACT_CHANGE_MESSAGE);
  });

  it('after setting TempMessage, message should be the temp message that was set', () => {
    let tempMessage = 'This is a temp message';
    service.setTempMessage(tempMessage);
    expect(service.currentMessage).toBe(tempMessage);
  });

  it('after setting TempMessage, message should revert after timeout duration', (done) => {
    let tempMessage = 'This is a temp message';
    service.setTempMessage(tempMessage);
    setTimeout( () => {
      expect(service.currentMessage).toBe(StringConstants.INSERT_COIN_MESSAGE);
      done();
    }, NumericConstants.TEMP_MESSAGE_DURATION_MS);
  });

  it('setting temp message and setting it again before timeout should change message', () => {
    let tempMessageOne = 'This is a temp message ONE';
    service.setTempMessage(tempMessageOne);
    let tempMessageTwo = 'This is a temp message TWO';
    service.setTempMessage(tempMessageTwo);
    expect(service.currentMessage).toBe(tempMessageTwo);
  });

  it('setting temp message then immediately setting balance to non zero should not change temp message', () => {
    let tempMessage = 'This is a temp message';
    service.setTempMessage(tempMessage);
    service.setBalance(150);
    expect(service.currentMessage).toBe(tempMessage);
  });


  it('setting temp message then setting balance to non zero should show balance after temp message expires', (done) => {
    let tempMessage = 'This is a temp message';
    service.setTempMessage(tempMessage);
    service.setBalance(105);
    setTimeout( () => {
      expect(service.currentMessage).toBe(formatPrice(105));
      done();
    }, NumericConstants.TEMP_MESSAGE_DURATION_MS);
  });
});
