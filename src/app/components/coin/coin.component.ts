import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CoinsEnum } from '../../shared/coins.enum';

@Component({
  selector: 'vmk-coin',
  template: `<button (click)='onCoinClick()'>{{coinText}}</button>`,
  styles: []
})
export class CoinComponent implements OnInit {
  @Input() coinEnum: CoinsEnum = CoinsEnum.UNKNOWN;
  @Input() coinText: string = 'Unknown';
  @Output() coinClicked = new EventEmitter<CoinsEnum>();

  constructor() {
  }

  ngOnInit() {
  }

  onCoinClick() {
    this.coinClicked.emit(this.coinEnum);
  }

}
