import { InventoryItem } from '../models/inventory-item';
import { Product } from '../models/product';

let inventoryItem: InventoryItem;
let product: Product = new Product(1, 'Product One', 123);
let inventoryQty = 10;

describe('Model: InventoryItem', () => {
  beforeEach(() => {
    inventoryItem = new InventoryItem(product, inventoryQty);
  });

  it('after creation should have initial values', () => {
    expect(inventoryItem.product).toBe(product);
    expect(inventoryItem.qty).toEqual(inventoryQty);
  });

  it('clone should return new object with initial values', () => {
    let clonedInventoryItem = inventoryItem.clone();

    expect(clonedInventoryItem).not.toBe(inventoryItem);
    expect(clonedInventoryItem.product).toEqual(product);
    expect(clonedInventoryItem.qty).toEqual(inventoryQty);
  });
});
