import Fueling from '../models/fueling'

class FuelingViewModel extends Fueling {
  constructor(fueling, getMPG) {
    super(fueling, getMPG || fueling.vehicleMPG)

    this.editing = fueling.editing
  }
}

export default FuelingViewModel
