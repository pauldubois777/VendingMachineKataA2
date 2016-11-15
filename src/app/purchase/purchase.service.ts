import { Injectable } from '@angular/core';

import { MessageDisplayService } from '../message-display/message-display.service';
import { InventoryService } from '../inventory/inventory.service';
import { Product } from '../models/product';
import { StringConstants } from '../shared/string-constants';

@Injectable()
export class PurchaseService {

  constructor(private messageDisplayService: MessageDisplayService, private inventoryService: InventoryService) {

  }

  purchase(product: Product): boolean {
    let inventoryItem = this.inventoryService.getItem(product);

    if (inventoryItem) {
      if (inventoryItem.qty > 0) {

      } else {
        this.messageDisplayService.setTempMessage(StringConstants.SOLD_OUT_MESSAGE);
        return false;
      }
    } else {

    }
  }

}
