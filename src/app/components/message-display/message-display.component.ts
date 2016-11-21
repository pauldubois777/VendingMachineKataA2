import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'vmk-message-display',
  template: `<div class='message'>{{message}}</div>`,
  styleUrls: ['./message-display.component.css']
})
export class MessageDisplayComponent implements OnInit, OnDestroy {
  message: string = '';
  private _currentMessageSubscription: Subscription;

  constructor(private _messageService: MessageService) { }

  ngOnInit() {
    this.message = this._messageService.currentMessage;
    this._currentMessageSubscription = this._messageService.currentMessageObservable.subscribe(
      (currentMessage: string) =>  {
        this.message = currentMessage;
      }
    );
  }
  ngOnDestroy() {
    this._currentMessageSubscription.unsubscribe();
  }
}
