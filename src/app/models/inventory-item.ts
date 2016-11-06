import { Product } from './product';

export class InventoryItem {
  constructor(
    public product: Product,
    public qty: number
  ) { }

  clone(): InventoryItem {
    return new InventoryItem(this.product.clone(), this.qty);
  }
}
