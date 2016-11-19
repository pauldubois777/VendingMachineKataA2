import { Injectable } from '@angular/core';

import { MessageService } from '../message/message.service';
import { InventoryService } from '../inventory/inventory.service';
import { BankService } from '../bank/bank.service';
import { InsertedCoinsService } from '../inserted-coins/inserted-coins.service';
import { Product } from '../../models/product';
import { StringConstants } from '../../shared/string-constants';
import { formatPrice } from '../../shared/helpers';

@Injectable()
export class PurchaseService {

  constructor(
    private _messageService: MessageService,
    private _inventoryService: InventoryService,
    private _insertedCoinsService: InsertedCoinsService,
    private _bankService: BankService) {

  }

  purchase(product: Product): boolean {
    let inventoryItem = this._inventoryService.getItem(product);

    if (!inventoryItem) {
      // Unknown product in inventory
      this._messageService.setTempMessage(StringConstants.UNKNOWN_PRODUCT_MESSAGE);
      return false;
    }

    if (inventoryItem.qty <= 0) {
      // Product sold out
      this._messageService.setTempMessage(StringConstants.SOLD_OUT_MESSAGE);
      return false;
    }

    if (this._insertedCoinsService.getValueInCents() < inventoryItem.product.costCents) {
      // Not enough money inserted for product cost
      this._messageService.setTempMessage(StringConstants.PRICE_MESSAGE_PREFIX + ' ' + formatPrice(inventoryItem.product.costCents));
      return false;
    }

    if (this._insertedCoinsService.getValueInCents() > inventoryItem.product.costCents && !this._bankService.canMakeChange()) {
      // Didn't insert exact change and bank can't make change
      this._messageService.setTempMessage(StringConstants.EXACT_CHANGE_MESSAGE);
      return false;
    }

    let retValue = this._inventoryService.dispense(product);
    if (!retValue) {
      // Something went wrong during dispense
      this._messageService.setTempMessage(StringConstants.UNABLE_TO_DISPENSE_MESSAGE);
      return false;
    } else {
      this._insertedCoinsService.purchase(product.costCents);
      this._messageService.setTempMessage(StringConstants.THANK_YOU_MESSAGE);
      return true;
    }
  }
}
