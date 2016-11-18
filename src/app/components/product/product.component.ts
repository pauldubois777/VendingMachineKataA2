import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product';
import { formatPrice } from '../../shared/helpers';

@Component({
  selector: 'vmk-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() productClicked = new EventEmitter<Product>();
  constructor() { }

  ngOnInit() {
  }

  costText(): string {
    return formatPrice(this.product.costCents);
  }

  onProductClick() {
    this.productClicked.emit(this.product);
  }
}
