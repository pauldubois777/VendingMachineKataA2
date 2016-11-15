/* tslint:disable:no-unused-variable */

import { PurchaseService } from './purchase.service';
import { MessageDisplayService } from '../message-display/message-display.service';
import { InventoryService } from '../inventory/inventory.service';
import { InitialInventory } from '../inventory/initial-inventory';
import { InventoryItem } from '../models/inventory-item';
import { Product } from '../models/product';
import { StringConstants } from '../shared/string-constants';

let service: PurchaseService;
let messageDisplayService: MessageDisplayService;
let inventoryService: InventoryService;
let initialInventory: InitialInventory;

describe('Service: Purchase', () => {
  beforeEach(() => {
    messageDisplayService = new MessageDisplayService();
    spyOn(messageDisplayService, 'setTempMessage');

    initialInventory = new InitialInventory();
    initialInventory.inventory = [
      new InventoryItem (new Product(1, 'Fruit Chews', 75), 0),
      new InventoryItem (new Product(6, 'Cola', 60), 5),
    ];
    inventoryService = new InventoryService(initialInventory);

    service = new PurchaseService(messageDisplayService, inventoryService);
  });

  it('purchase product with qty available 0 calls service to display temp message sold out', () => {
    let retValue = service.purchase(initialInventory.inventory[0].product);

    expect(retValue).toEqual(false);
    expect(messageDisplayService.setTempMessage).toHaveBeenCalledWith(StringConstants.SOLD_OUT_MESSAGE);
  });


});
