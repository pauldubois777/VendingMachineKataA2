import { InventoryItem } from '../../models/inventory-item';
import { Product } from '../../models/product';

export class InitialInventory {
  inventory: Array<InventoryItem> = [
    new InventoryItem (new Product(1, 'Spritzer', 100, 'assets/images/products/spritzer.png'), 4),
    new InventoryItem (new Product(2, 'Chips', 50, 'assets/images/products/chips.png'), 4),
    new InventoryItem (new Product(3, 'Candy', 65, 'assets/images/products/candy.png'), 4)
  ];
}
