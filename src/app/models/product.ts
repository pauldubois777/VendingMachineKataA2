export class Product {
  constructor(
    public id: number,
    public description: string,
    public costCents: number,
    public imageUrl: string
  ) { }

  clone(): Product {
    return new Product(this.id, this.description, this.costCents, this.imageUrl);
  }
}
