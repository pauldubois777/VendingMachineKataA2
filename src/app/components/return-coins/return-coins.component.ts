import { Component, OnInit } from '@angular/core';

import { InsertedCoinsService } from '../../services/inserted-coins/inserted-coins.service';

@Component({
  selector: 'vmk-return-coins',
  template: `<button class='btn btn-success' (click)='onReturnClick()' [disabled]='!enableCoinReturn()' >Return Coins</button>`,
  styles: []
})
export class ReturnCoinsComponent implements OnInit {

  constructor(private _insertedCoinsService: InsertedCoinsService) { }

  ngOnInit() {
  }

  onReturnClick() {
    this._insertedCoinsService.returnAll();
  }

  enableCoinReturn(): boolean {
    return this._insertedCoinsService.getValueInCents() > 0;
  }
}
