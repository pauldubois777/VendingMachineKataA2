import { InventoryItem } from '../models/inventory-item';
import { Product } from '../models/product';

export var INITIAL_INVENTORY: Array<InventoryItem> = [
  new InventoryItem (new Product('Cola', 1), 20),
  new InventoryItem (new Product('Chips', .5), 20),
  new InventoryItem (new Product('Candy', .65), 20)
];
