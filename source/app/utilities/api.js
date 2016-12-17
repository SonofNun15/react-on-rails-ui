import * as vehiclesApi from './vehicleApi'
import * as profileApi from './profileApi'
import * as fuelingsApi from './fuelingApi'
import * as maintenanceApi from './maintenanceApi'

export default {
  ...vehiclesApi,
  ...profileApi,
  ...fuelingsApi,
  ...maintenanceApi,
}
