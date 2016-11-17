import { Component, OnInit } from '@angular/core';

import { InsertedCoinsService } from '../../services/inserted-coins/inserted-coins.service';
import { CoinsEnum } from '../../shared/coins.enum';

@Component({
  selector: 'vmk-coin-slot',
  templateUrl: './coin-slot.component.html',
  styleUrls: ['./coin-slot.component.css']
})
export class CoinSlotComponent implements OnInit {
  coinsEnum = CoinsEnum; // This allows the use of enumeration in the template;
  constructor(private _insertedCoinsService: InsertedCoinsService) { }

  ngOnInit() {
  }

  onInsertCoin(coinEnum: CoinsEnum) {
    this._insertedCoinsService.insertCoin(coinEnum);
  }
}
