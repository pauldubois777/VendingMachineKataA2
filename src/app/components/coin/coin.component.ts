import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CoinsEnum } from '../../shared/coins.enum';
import { getCoinText } from '../../shared/helpers';
import { getCoinUrl } from '../../shared/helpers';

@Component({
  selector: 'vmk-coin',
  template: `<img class='coin' [src]='coinUrl()' (click)='onCoinClick()' [title]='coinText()' />`,
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {
  @Input() coinEnum: CoinsEnum = CoinsEnum.UNKNOWN;
  @Output() coinClicked = new EventEmitter<CoinsEnum>();

  constructor() {
  }

  ngOnInit() {
  }

  onCoinClick() {
    this.coinClicked.emit(this.coinEnum);
  }

  coinText(): string {
    return getCoinText(this.coinEnum);
  }

  coinUrl(): string {
    return getCoinUrl(this.coinEnum);
  }
}
