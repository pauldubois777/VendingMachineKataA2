/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { MessageDisplayComponent } from './message-display.component';
import { MessageService } from '../../services/message/message.service';
import { BankService } from '../../services/bank/bank.service';
import { CoinReturnService } from '../../services/coin-return/coin-return.service';
import { InitialBankCoins } from '../../services/bank/initial-bank-coins';

let messageService: MessageService;
let component:    MessageDisplayComponent;
let fixture: ComponentFixture<MessageDisplayComponent>;

describe('Component: MessageDisplay', () => {
  let coinReturnService = new CoinReturnService();
  let bankService = new BankService(new InitialBankCoins(), coinReturnService);
  messageService = new MessageService(bankService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessageDisplayComponent
      ],
      providers: [
        {provide: MessageService, useValue: messageService }
      ]
    });

    fixture = TestBed.createComponent(MessageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
