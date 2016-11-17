import { Injectable } from '@angular/core';

import { InventoryItem } from '../../models/inventory-item';
import { Product } from '../../models/product';
import { InitialInventory } from './initial-inventory';
import { StringConstants } from '../../shared/string-constants';

@Injectable()
export class InventoryService {
  private _inventory: Array<InventoryItem> = new Array<InventoryItem>();

  constructor(initialInventory: InitialInventory) {
    initialInventory.inventory.forEach( (intitialInventoryItem) => {
      this._inventory.push(intitialInventoryItem.clone());
    });
  }

  get Inventory(): Array<InventoryItem>{
    let inventory: Array<InventoryItem> = new Array<InventoryItem>();

    this._inventory.forEach( (inventoryItem) => {
      inventory.push(inventoryItem.clone());
    });

    return inventory;
  }

  getItem(product: Product): InventoryItem {
    let inventoryItemFound = this._inventory.find( inventoryItem => inventoryItem.product.id === product.id );
    if (inventoryItemFound) {
      return inventoryItemFound.clone();
    } else {
      return null;
    }
  }

  dispense(product: Product): boolean {
    let inventoryItemFound = this._inventory.find( inventoryItem => inventoryItem.product.id === product.id );
    if (inventoryItemFound) {
      if (inventoryItemFound.qty > 0) {
        // Send the product to the consumer!
        inventoryItemFound.qty--;
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error(StringConstants.PRODUCT_NOT_IN_INVENTORY_ERROR);
    }
  }
}
