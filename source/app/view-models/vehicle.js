import _ from 'lodash'

import Vehicle from '../models/vehicle'
import FuelingViewModel from './fueling'
import MaintenanceViewModel from './maintenance'

class VehicleViewModel extends Vehicle {
  constructor(vehicleData) {
    super(vehicleData)

    this.editor = vehicleData.editor

    this.fuelings = _.map(vehicleData.fuelings, f => {
      return new FuelingViewModel(f, () => this.lifetimeMPG())
    })
    this.maintenance = _.map(vehicleData.maintenance, m => {
      return new MaintenanceViewModel(m,
                                      () => this.lastMaintenance() == m,
                                      () => this.requiresMaintenance())
    })
  }
}

export default VehicleViewModel
