import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { InventoryItem } from '../../models/inventory-item';
import { InventoryService } from '../../services/inventory/inventory.service';


@Component({
  selector: 'vmk-inventory-monitor',
  templateUrl: './inventory-monitor.component.html',
  styleUrls: ['./inventory-monitor.component.css']
})
export class InventoryMonitorComponent implements OnInit, OnDestroy {
  inventory: Array<InventoryItem> = [];
  private _InventoryChangedSubscription: Subscription;

  constructor(private _inventoryService: InventoryService) { }

  ngOnInit() {
    this.inventory = this._inventoryService.Inventory;

    this._InventoryChangedSubscription = this._inventoryService.inventoryChangedObservable.subscribe(
      () =>  {
        this.inventory = this._inventoryService.Inventory;
      }
    );
  }

  ngOnDestroy() {
    this._InventoryChangedSubscription.unsubscribe();
  }
}
