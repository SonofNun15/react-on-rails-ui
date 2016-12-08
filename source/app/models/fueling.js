import moment from 'moment'

class Fueling {
  constructor(values, getMPG) {
    this.vehicleMPG = getMPG

    this.id = values.id
    this.miles = values.miles
    this.gas = values.gas
    this.cost = values.cost
    this.date = moment(values.date)
  }

  mpg() {
    return this.miles / this.gas
  }

  aboveAverageMPG() {
    return this.mpg() > this.vehicleMPG()
  }
}

export default Fueling
