import moment from 'moment'

class Fueling {
  constructor(values, getMPG) {
    this.vehicleMPG = getMPG

    this.id = values.id
    this.miles = parseInt(values.miles)
    this.gas = parseInt(values.gas)
    this.cost = parseInt(values.cost)
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
