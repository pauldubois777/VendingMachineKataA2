/* tslint:disable:no-unused-variable */

import { InventoryService } from './inventory.service';
import { Product } from '../models/product';
import { INITIAL_INVENTORY } from '../shared/initial-inventory';
import { StringConstants } from '../shared/string-constants';

let service: InventoryService;

describe('Service: Inventory', () => {
  beforeEach(() => {
    service = new InventoryService();
  });

  it('after creation should have initial inventory', () => {
    expect(service.Inventory).toEqual(INITIAL_INVENTORY);
  });

  it('dispensing each product decrements product qtys', () => {
    INITIAL_INVENTORY.forEach( (inventoryItem) => {
      let dispenseReturnValue = service.dispense(inventoryItem.product);
      expect(dispenseReturnValue).toEqual(true);
    });

    for (let idx = 0; idx < INITIAL_INVENTORY.length; idx++) {
      expect(service.Inventory[idx].qty).toEqual(INITIAL_INVENTORY[idx].qty - 1);
    }
  });

  it('dispensing product with qty returns true', () => {
    let dispenseReturnValue = service.dispense(INITIAL_INVENTORY[0].product);
    expect(dispenseReturnValue).toEqual(true);
  });

  it('dispensing a product with 0 qty returns false', () => {
    // Make the qty zero by dispensing all
    let qtyToDispense = service.Inventory[0].qty;
    for (let idx = 0; idx < qtyToDispense; idx++) {
      service.dispense(service.Inventory[0].product);
    }

    let dispenseReturnValue = service.dispense(service.Inventory[0].product);
    expect(dispenseReturnValue).toEqual(false);
  });

  it('dispensing a product not in inventory throws error', () => {
    let productNotInInventory = new Product(999999, 'Product not in inventory', 3.14);
    expect(() => service.dispense(productNotInInventory)).toThrowError(StringConstants.PRODUCT_NOT_IN_INVENTORY_ERROR);
  });

  it('altering returned Inventory should not change Inventory', () => {
    let inventory = service.Inventory;
    let origQty = inventory[0].qty;
    inventory[0].qty = origQty + 1;
    expect(service.Inventory[0].qty).toEqual(origQty);
  });
});
