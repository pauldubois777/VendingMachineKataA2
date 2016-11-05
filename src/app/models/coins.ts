export class Coins {
  constructor(
    public nickles = 0,
    public dimes = 0,
    public quarters = 0) {
  }

  value(): number {
    return (this.nickles * .05) + (this.dimes * .10) + (this.quarters * .25);    
  }
}