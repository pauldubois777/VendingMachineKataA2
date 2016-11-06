import { Product } from './product';

export class InventoryItem {
  constructor(
    public product: Product,
    public qty: number
  ) { }
}
