import { Injectable } from '@angular/core';

import { MessageDisplayService } from '../message-display/message-display.service';
import { InventoryService } from '../inventory/inventory.service';
import { Product } from '../models/product';
import { StringConstants } from '../shared/string-constants';
import { InsertedCoinsService } from '../inserted-coins/inserted-coins.service';
import { formatDisplayPrice } from '../shared/helpers';

@Injectable()
export class PurchaseService {

  constructor(
    private messageDisplayService: MessageDisplayService,
    private inventoryService: InventoryService,
    private insertedCoinsService: InsertedCoinsService) {

  }

  purchase(product: Product): boolean {
    let inventoryItem = this.inventoryService.getItem(product);

    if (!inventoryItem) {
      // Unknown product in inventory
      this.messageDisplayService.setTempMessage(StringConstants.UNKNOWN_PRODUCT_MESSAGE);
      return false;
    }

    if (inventoryItem.qty <= 0) {
      // Product sold out
      this.messageDisplayService.setTempMessage(StringConstants.SOLD_OUT_MESSAGE);
      return false;
    }

    if (this.insertedCoinsService.ValueInCents < inventoryItem.product.costCents) {
      // Not enough money inserted for product cost
      this.messageDisplayService.setTempMessage(formatDisplayPrice(inventoryItem.product.costCents));
      return false;
    }

    let retValue = this.inventoryService.dispense(product);
    if (!retValue) {
      return false;
    } else {
      this.insertedCoinsService.purchase(product.costCents);
      this.messageDisplayService.setTempMessage(StringConstants.THANK_YOU_MESSAGE);
      return true;
    }
  }
}
