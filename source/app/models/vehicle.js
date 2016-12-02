import _ from 'lodash'
import moment from 'moment'

import Fueling from './fueling'
import Maintenance from './maintenance'

const recentTimeWindow = moment.duration(6, 'months')

class Vehicle {
  constructor(values) {
    this.id = values.id
    this.year = values.year
    this.make = values.make
    this.model = values.model
    this.color = values.color
    this.baseMileage = values.mileage

    this.fuelings = _.map(values.fuelings, f => new Fueling(f))
    this.maintenance = _.map(values.maintenance, m => new Maintenance(m))

    this.milesBeforeMaintenance = 5000
  }

  requiresMaintenance() {
    if (_.some(this.maintenance)) {
      return this.mileageSinceMaintenance() >= this.milesBeforeMaintenance
    }

    return true
  }

  lifetimeMPG() {
    return this.averageFuelings(this.fuelings)
  }

  recentMPG() {
    const recentFuelings = this.recentFuelings()
    return this.averageFuelings(recentFuelings)
  }

  averageFuelings(fuelings) {
    if (_.some(fuelings)) {
      return _(fuelings).map(f => f.mpg()).sum() / fuelings.length
    }

    return null
  }

  lifetimeMileage() {
    const recordedMiles = this.sumMiles(this.fuelings)
    return recordedMiles + this.baseMileage
  }

  recentMileage() {
    return this.sumMiles(this.recentFuelings())
  }

  recentFuelings() {
    const now = moment()
    const recent = now.subtract(recentTimeWindow)
    return _.filter(this.fuelings, f => recent.isBefore(f.date))
  }

  mileageSinceMaintenance() {
    return this.sumMiles(this.fuelingsSinceMaintenance())
  }

  sumMiles(fuelings) {
    if (_.some(fuelings)) {
      return _(fuelings).map(f => f.miles).sum()
    }

    return 0
  }

  fuelingsSinceMaintenance() {
    const lastMaintenance = this.lastMaintenance()

    if (lastMaintenance) {
      const maintenanceDate = moment(lastMaintenance.date)
      return _.filter(this.fuelings, f => maintenanceDate.isBefore(f.date))
    }

    return []
  }

  lastMaintenance() {
    return _(this.maintenance).orderBy(entry => entry.date).last()
  }
}

export default Vehicle
