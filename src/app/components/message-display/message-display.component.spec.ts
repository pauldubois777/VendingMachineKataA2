/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { MessageDisplayComponent } from './message-display.component';
import { MessageService } from '../../services/message/message.service';

let messageService: MessageService;
let component:    MessageDisplayComponent;
let fixture: ComponentFixture<MessageDisplayComponent>;

describe('Component: MessageDisplay', () => {
  messageService = new MessageService();

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
