import * as actions from './actions'

import VehicleViewModel from '../view-models/vehicle'
import Fueling from '../models/fueling'
import Maintenance from '../models/maintenance'

export default function vehicleReducer(state, action) {
  switch(action.type) {
    case actions.SHOW_FUELING_EDITOR:
      return new VehicleViewModel({
        ...state,
        editor: Fueling,
      })

    case actions.SHOW_MAINTENANCE_EDITOR:
      return new VehicleViewModel({
        ...state,
        editor: Maintenance,
      })

    case actions.CLOSE_EDITOR:
      return new VehicleViewModel({
        ...state,
        editor: null,
      })

    case actions.SAVING_FUELING:
      return new VehicleViewModel({
        ...state,
        savingFueling: true,
      })

    case actions.FUELING_SAVED: {
      const fuelings = [...state.fuelings, action.fueling]
      return new VehicleViewModel({
        ...state,
        fuelings,
        editor: null,
      })
    }

    case actions.SAVING_MAINTENANCE:
      return new VehicleViewModel({
        ...state,
        savingMaintenance: true,
      })

    case actions.MAINTENANCE_SAVED: {
      const maintenance = [...state.maintenance, action.maintenance]
      return new VehicleViewModel({
        ...state,
        maintenance,
        editor: null,
      })
    }
  }
}
