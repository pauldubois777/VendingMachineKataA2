import { Component, OnInit } from '@angular/core';

import { InventoryService } from '../../services/inventory/inventory.service';
import { InventoryItem } from '../../models/inventory-item';
import { Product } from '../../models/product';
import { PurchaseService } from '../../services/purchase/purchase.service';

@Component({
  selector: 'vmk-products-for-sale',
  templateUrl: './products-for-sale.component.html',
  styleUrls: ['./products-for-sale.component.css']
})
export class ProductsForSaleComponent implements OnInit {
  inventory: Array<InventoryItem> = [];

  constructor(private _inventoryService: InventoryService, private _purchaseService: PurchaseService) {
    this.inventory = _inventoryService.Inventory;
  }

  ngOnInit() {
  }

  onProductClicked(product: Product) {
    this._purchaseService.purchase(product);
  }
}
