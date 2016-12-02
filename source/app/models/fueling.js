class Fueling {
  constructor(values) {
    this.id = values.id
    this.miles = values.miles
    this.gas = values.gas
    this.cost = values.cost
    this.date = values.date
  }

  mpg() {
    return this.miles / this.gas
  }
}

export default Fueling
