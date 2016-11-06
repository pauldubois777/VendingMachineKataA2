import { Injectable } from '@angular/core';

import { InventoryItem } from '../models/inventory-item';
import { Product } from '../models/product';
import { INITIAL_INVENTORY } from '../shared/initial-inventory';

@Injectable()
export class InventoryService {
  private _inventory: Array<InventoryItem> = new Array<InventoryItem>();

  constructor() {
    INITIAL_INVENTORY.forEach( (intitialInventoryItem) => {
      this._inventory.push(intitialInventoryItem.clone());
    });
  }

  get Inventory(): Array<InventoryItem>{
    return this._inventory;
  }

  // Returns null if invalid product or product qty is zero
  // TODO: Alter logic to throw exception if invalid product
  dispense(product: Product): Product {
    let dispensedProduct: Product = null;

    // Small amount of products so just go through them all
    this._inventory.forEach( (inventoryItem, idx) => {
      if (inventoryItem.product.id === product.id) {
        if (inventoryItem.qty > 0) {
          this._inventory[idx].qty--;
          dispensedProduct = inventoryItem.product;
        }
      }
    });

    return dispensedProduct;
  }
}
