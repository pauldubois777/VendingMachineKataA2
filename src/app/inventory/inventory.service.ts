import { Injectable } from '@angular/core';

import { Product } from '../models/product';
import { INITIAL_INVENTORY } from '../shared/initial-inventory';

@Injectable()
export class InventoryService {
  private _inventory: Array<Product>;

  constructor() {
    this._inventory = INITIAL_INVENTORY.slice(0);
  }

  get Inventory(): Array<Product>{
    return this._inventory;
  }

}
