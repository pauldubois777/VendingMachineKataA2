import { Product } from '../models/product';

let product: Product;
let productId = 1;
let productDesc = 'Product One';
let productCost = 1.23;

describe('Model: Product', () => {
  beforeEach(() => {
    product = new Product(productId, productDesc, productCost);
  });

  it('after creation should have initial values', () => {
    expect(product.id).toEqual(productId);
    expect(product.description).toEqual(productDesc);
    expect(product.cost).toEqual(productCost);
  });

  it('clone should return new object with initial values', () => {
    let clonedProduct = product.clone();

    expect(clonedProduct).not.toBe(product);
    expect(clonedProduct.id).toEqual(productId);
    expect(clonedProduct.description).toEqual(productDesc);
    expect(clonedProduct.cost).toEqual(productCost);
  });

});
