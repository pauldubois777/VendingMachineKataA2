import { InventoryItem } from '../models/inventory-item';
import { Product } from '../models/product';

export class InitialInventory {
  inventory: Array<InventoryItem> = [
    new InventoryItem (new Product(1, 'Cola', 100), 20),
    new InventoryItem (new Product(2, 'Chips', 50), 25),
    new InventoryItem (new Product(3, 'Candy', 65), 30)
  ];
}
