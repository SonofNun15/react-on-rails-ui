class Vehicle {
  constructor(values) {
    this.id = values.id
    this.year = values.year
    this.make = values.make
    this.model = values.model
    this.color = values.color
    this.mileage = values.mileage
  }

  requiresMaintenance() {
    return true
  }
}

export default Vehicle
