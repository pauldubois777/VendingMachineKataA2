import { Injectable } from '@angular/core';

import { INITIAL_INVENTORY } from './initial-inventory';
import { InventoryItem } from '../models/inventory-item';

@Injectable()
export class InitialInventoryService {
  private _initialInventory: Array<InventoryItem> = new Array<InventoryItem>();

  constructor() {
    INITIAL_INVENTORY.forEach( (intitialInventoryItem) => {
      this._initialInventory.push(intitialInventoryItem.clone());
    });
  }

  get InitialInventory(): Array<InventoryItem>{
    let initialInventory: Array<InventoryItem> = new Array<InventoryItem>();

    this._initialInventory.forEach( (inventoryItem) => {
      initialInventory.push(inventoryItem.clone());
    });

    return initialInventory;
  }
}
