import Vehicle from '../models/vehicle'

class VehicleViewModel extends Vehicle {
  constructor(vehicleData) {
    super(vehicleData)

    this.editor = vehicleData.editor
  }
}

export default VehicleViewModel
