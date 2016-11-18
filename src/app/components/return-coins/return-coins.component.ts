import { Component, OnInit } from '@angular/core';

import { InsertedCoinsService } from '../../services/inserted-coins/inserted-coins.service';

@Component({
  selector: 'vmk-return-coins',
  template: `<button (click)='onReturnClick()'>Return Coins</button>`,
  styles: []
})
export class ReturnCoinsComponent implements OnInit {

  constructor(private _insertedCoinsService: InsertedCoinsService) { }

  ngOnInit() {
  }

  onReturnClick() {
    this._insertedCoinsService.returnAll();
  }
}
