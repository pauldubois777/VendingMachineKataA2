import { Product } from '../models/product';

let product: Product;
let productId = 1;
let productDesc = 'Product One';
let productCostCents = 123;
let productImageUrl = 'assets/images/products/product1.svg';

describe('Model: Product', () => {
  beforeEach(() => {
    product = new Product(productId, productDesc, productCostCents, productImageUrl);
  });

  it('after creation should have initial values', () => {
    expect(product.id).toEqual(productId);
    expect(product.description).toEqual(productDesc);
    expect(product.costCents).toEqual(productCostCents);
    expect(product.imageUrl).toEqual(productImageUrl);
  });

  it('clone should return new object with initial values', () => {
    let clonedProduct = product.clone();

    expect(clonedProduct).not.toBe(product);
    expect(clonedProduct.id).toEqual(productId);
    expect(clonedProduct.description).toEqual(productDesc);
    expect(clonedProduct.costCents).toEqual(productCostCents);
    expect(clonedProduct.imageUrl).toEqual(productImageUrl);
  });

});
