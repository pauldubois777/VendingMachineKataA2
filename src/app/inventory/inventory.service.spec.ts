/* tslint:disable:no-unused-variable */

import { InitialInventory } from './initial-inventory';
import { InventoryItem } from '../models/inventory-item';
import { InventoryService } from './inventory.service';
import { Product } from '../models/product';
import { StringConstants } from '../shared/string-constants';

let service: InventoryService;
let initialInventory: InitialInventory;

describe('Service: Inventory', () => {
  beforeEach(() => {
    // Let's use some products other than the initial inventory to flex tests
    initialInventory = new InitialInventory();
    initialInventory.inventory = [
      new InventoryItem (new Product(5, 'TestCola', 75), 2),
      new InventoryItem (new Product(6, 'ChipsAhoy', 150), 5),
      new InventoryItem (new Product(8, 'Popcorn', 80), 3),
      new InventoryItem (new Product(7, 'Star Wars DVD', 335), 6)
    ];
    service = new InventoryService(initialInventory);
  });

  it('after creation should have initial inventory', () => {
    expect(service.Inventory).toEqual(initialInventory.inventory);
  });

  it('dispensing each product decrements product qtys', () => {
    initialInventory.inventory.forEach( (inventoryItem) => {
      let dispenseReturnValue = service.dispense(inventoryItem.product);
      expect(dispenseReturnValue).toEqual(true);
    });

    for (let idx = 0; idx < initialInventory.inventory.length; idx++) {
      expect(service.Inventory[idx].qty).toEqual(initialInventory.inventory[idx].qty - 1);
    }
  });

  it('dispensing product with qty returns true', () => {
    let dispenseReturnValue = service.dispense(initialInventory.inventory[0].product);
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
    let productNotInInventory = new Product(999999, 'Product not in inventory', 314);
    expect(() => service.dispense(productNotInInventory)).toThrowError(StringConstants.PRODUCT_NOT_IN_INVENTORY_ERROR);
  });

  it('altering returned Inventory should not change Inventory', () => {
    let inventory = service.Inventory;
    let origQty = inventory[0].qty;
    inventory[0].qty = origQty + 1;
    expect(service.Inventory[0].qty).toEqual(origQty);
  });

  it('getItem returns Inventory Item for valid product', () => {
    let returnedInventoryItem = service.getItem(initialInventory.inventory[0].product);
    expect(returnedInventoryItem).not.toBe(initialInventory.inventory[0], 'Cloned inventory item');
    expect(returnedInventoryItem.product).not.toBe(initialInventory.inventory[0].product, 'Cloned product');
    expect(returnedInventoryItem).toEqual(initialInventory.inventory[0], 'Equal Product');
    expect(returnedInventoryItem.product).toEqual(initialInventory.inventory[0].product, 'Equal Inventory Item');
  });

  it('getItem returns null for invalid product', () => {
    let returnedInventoryItem = service.getItem(new Product(99887766, 'Fake Product', 123));
    expect(returnedInventoryItem).toEqual(null);
  });
});
