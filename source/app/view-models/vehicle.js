import _ from 'lodash'

import Vehicle from '../models/vehicle'
import FuelingViewModel from './fueling'

class VehicleViewModel extends Vehicle {
  constructor(vehicleData) {
    super(vehicleData)

    this.editor = vehicleData.editor

    this.fuelings = _.map(vehicleData.fuelings, f => new FuelingViewModel(f, () => this.lifetimeMPG()))
  }
}

export default VehicleViewModel
