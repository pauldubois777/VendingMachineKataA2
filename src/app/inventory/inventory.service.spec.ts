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

});
