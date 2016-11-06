export class Product {
  constructor(
    public id: number,
    public description: string,
    public cost: number
  ) { }

  clone(): Product {
    return new Product(this.id, this.description, this.cost);
  }
}
