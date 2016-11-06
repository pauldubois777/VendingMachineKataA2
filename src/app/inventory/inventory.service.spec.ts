/* tslint:disable:no-unused-variable */

import { InventoryService } from './inventory.service';
import { Product } from '../models/product';
import { INITIAL_INVENTORY } from '../shared/initial-inventory';

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
      service.dispense(inventoryItem.product);
    });

    for (let idx = 0; idx < INITIAL_INVENTORY.length; idx++) {
      expect(service.Inventory[idx].qty).toEqual(INITIAL_INVENTORY[idx].qty - 1);
    }
  });

  it('dispensing product with qty returns product', () => {
    let dispensedProduct = service.dispense(INITIAL_INVENTORY[0].product);
    expect(dispensedProduct).toEqual(INITIAL_INVENTORY[0].product);
  });

  it('dispensing a product with 0 qty returns null', () => {
    // Make the qty zero by dispensing all
    let qtyToDispense = service.Inventory[0].qty;
    for (let idx = 0; idx < qtyToDispense; idx++) {
      service.dispense(service.Inventory[0].product);
    }

    let dispensedProduct = service.dispense(service.Inventory[0].product);
    expect(dispensedProduct).toEqual(null);
  });

  it('dispensing a product not in inventory returns null', () => {
    let dispensedProduct = service.dispense(new Product(999999, 'Product not in inventory', 3.14));
    expect(dispensedProduct).toEqual(null);
  });
});
