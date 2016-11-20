/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { InventoryMonitorComponent } from './inventory-monitor.component';
import { InventoryService } from '../../services/inventory/inventory.service';
import { InitialInventory } from '../../services/inventory/initial-inventory';

describe('Component: InventoryMonitor', () => {
  it('should create an instance', () => {
    let inventoryService = new InventoryService(new InitialInventory());

    let component = new InventoryMonitorComponent(inventoryService);
    expect(component).toBeTruthy();
  });
});
