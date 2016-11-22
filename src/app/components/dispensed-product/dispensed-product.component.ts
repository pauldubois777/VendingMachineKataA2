import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { InventoryService } from '../../services/inventory/inventory.service';
import { Product } from '../../models/product';

@Component({
  selector: 'vmk-dispensed-product',
  templateUrl: './dispensed-product.component.html',
  styleUrls: ['./dispensed-product.component.css']
})
export class DispensedProductComponent implements OnInit, OnDestroy {
  dispensedProducts: Array<Product> = [];
  private _productDispensedSubscription: Subscription;

  constructor(private _inventoryService: InventoryService) { }

  ngOnInit() {
    this.dispensedProducts = [];

    this._productDispensedSubscription = this._inventoryService.productDispensedObservable.subscribe(
      (productDispensed: Product) =>  {
        this.dispensedProducts.push(productDispensed);
      }
    );
  }

  ngOnDestroy() {
    this._productDispensedSubscription.unsubscribe();
  }

  productOnClick(){
    this.dispensedProducts = [];
  }  
}
