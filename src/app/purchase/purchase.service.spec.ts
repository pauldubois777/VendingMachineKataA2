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
let setTempMessageSpy: jasmine.Spy;

describe('Service: Purchase', () => {
  beforeEach(() => {
    messageDisplayService = new MessageDisplayService();
    setTempMessageSpy = spyOn(messageDisplayService, 'setTempMessage');

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
    expect(setTempMessageSpy).toHaveBeenCalledWith(StringConstants.SOLD_OUT_MESSAGE);
  });

  it('purchase invalid product calls service to display temp message error', () => {
    let retValue = service.purchase(new Product(123321, 'Product not in inventory', 123));

    expect(retValue).toEqual(false);
    expect(setTempMessageSpy).toHaveBeenCalledWith(StringConstants.UNKNOWN_PRODUCT_MESSAGE);
  });
});
