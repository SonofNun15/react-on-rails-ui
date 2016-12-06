import Vehicle from '../models/vehicle'

class VehicleViewModel extends Vehicle {
  constructor(vehicleData) {
    super(vehicleData)

    this.editor = null
  }
}

export default VehicleViewModel
