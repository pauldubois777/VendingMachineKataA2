import { Product } from '../models/product';

let product: Product;
let productId = 1;
let productDesc = 'Product One';
let productCostCents = 123;

describe('Model: Product', () => {
  beforeEach(() => {
    product = new Product(productId, productDesc, productCostCents);
  });

  it('after creation should have initial values', () => {
    expect(product.id).toEqual(productId);
    expect(product.description).toEqual(productDesc);
    expect(product.costCents).toEqual(productCostCents);
  });

  it('clone should return new object with initial values', () => {
    let clonedProduct = product.clone();

    expect(clonedProduct).not.toBe(product);
    expect(clonedProduct.id).toEqual(productId);
    expect(clonedProduct.description).toEqual(productDesc);
    expect(clonedProduct.costCents).toEqual(productCostCents);
  });

});
