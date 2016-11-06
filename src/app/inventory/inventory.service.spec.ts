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

});
