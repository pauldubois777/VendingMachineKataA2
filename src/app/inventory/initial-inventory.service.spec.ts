/* tslint:disable:no-unused-variable */

import { InitialInventoryService } from './initial-inventory.service';
import { INITIAL_INVENTORY } from './initial-inventory';

let service: InitialInventoryService;

describe('Service: IntialInventory', () => {
  beforeEach(() => {
    service = new InitialInventoryService();
  });

  it('after creation should have initial inventory', () => {
    expect(service.InitialInventory).toEqual(INITIAL_INVENTORY);
  });
});
