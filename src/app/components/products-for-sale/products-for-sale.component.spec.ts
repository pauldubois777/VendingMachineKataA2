/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ProductsForSaleComponent } from './products-for-sale.component';
import { InventoryService } from '../../services/inventory/inventory.service';
import { InitialInventory } from '../../services/inventory/initial-inventory';

describe('Component: ProductsForSale', () => {
  it('should create an instance', () => {
    let initialInventory = new InitialInventory();
    let inventoryService = new InventoryService(initialInventory);

    let component = new ProductsForSaleComponent(inventoryService);
    expect(component).toBeTruthy();
  });
});
