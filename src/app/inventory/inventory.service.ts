import { Injectable } from '@angular/core';

import { InventoryItem } from '../models/inventory-item';
import { Product } from '../models/product';
import { INITIAL_INVENTORY } from '../shared/initial-inventory';

@Injectable()
export class InventoryService {
  private _inventory: Array<InventoryItem>;

  constructor() {
    this._inventory = INITIAL_INVENTORY.slice(0);
  }

  get Inventory(): Array<InventoryItem>{
    return this._inventory;
  }

}
