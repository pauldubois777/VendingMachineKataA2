import { Injectable } from '@angular/core';

import { MessageDisplayService } from '../message-display/message-display.service';
import { InventoryService } from '../inventory/inventory.service';
import { Product } from '../models/product';
import { StringConstants } from '../shared/string-constants';
import { InsertedCoinsService } from '../inserted-coins/inserted-coins.service';

@Injectable()
export class PurchaseService {

  constructor(
    private messageDisplayService: MessageDisplayService,
    private inventoryService: InventoryService,
    private insertedCoinsService: InsertedCoinsService) {

  }

  purchase(product: Product): boolean {
    let inventoryItem = this.inventoryService.getItem(product);

    if (inventoryItem) {
      if (inventoryItem.qty > 0) {
        if (inventoryItem.product.costCents > this.insertedCoinsService.ValueInCents) {
          this.messageDisplayService.setTempMessage(
            StringConstants.PRICE_MESSAGE_PREFIX + ' ' + (inventoryItem.product.costCents / 100));
          return false;
        }
      } else {
        this.messageDisplayService.setTempMessage(StringConstants.SOLD_OUT_MESSAGE);
        return false;
      }
    } else {
      this.messageDisplayService.setTempMessage(StringConstants.UNKNOWN_PRODUCT_MESSAGE);
      return false;
    }
  }

}
