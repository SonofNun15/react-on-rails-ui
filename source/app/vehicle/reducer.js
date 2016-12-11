import _ from 'lodash'

import * as actions from './actions'
import * as fuelingActions from './data-table/fueling/actions'
import fuelingReducer from './data-table/fueling/reducer'

import VehicleViewModel from '../view-models/vehicle'
import Fueling from '../models/fueling'
import Maintenance from '../models/maintenance'

function reduceFuelings(fuelings, action) {
  const index = _.findIndex(fuelings, f => f.id == action.fuelingId)
  if (index >= 0) {
    let clone = [...fuelings]
    clone[index] = fuelingReducer(fuelings[index], action)
    return clone
  } else {
    return fuelings
  }
}

export default function vehicleReducer(state, action) {
  const fuelingsReducedState = action.fuelingId != null
    ? new VehicleViewModel({ ...state, fuelings: reduceFuelings(state.fuelings, action) })
    : state

  switch(action.type) {
    case actions.SHOW_NEW_FUELING_EDITOR:
      return new VehicleViewModel({
        ...fuelingsReducedState,
        editor: Fueling,
      })

    case actions.CREATING_FUELING:
      return new VehicleViewModel({
        ...fuelingsReducedState,
        savingFueling: true,
      })

    case actions.FUELING_CREATED: {
      const fuelings = [...fuelingsReducedState.fuelings, action.fueling]
      return new VehicleViewModel({
        ...fuelingsReducedState,
        fuelings,
        editor: null,
      })
    }

    case actions.SHOW_NEW_MAINTENANCE_EDITOR:
      return new VehicleViewModel({
        ...fuelingsReducedState,
        editor: Maintenance,
      })

    case actions.MAINTENANCE_CREATED: {
      const maintenance = [...fuelingsReducedState.maintenance, action.maintenance]
      return new VehicleViewModel({
        ...fuelingsReducedState,
        maintenance,
        editor: null,
      })
     }

    case actions.CREATING_MAINTENANCE:
      return {
        ...fuelingsReducedState,
        savingMaintenance: true,
      }

    case actions.CLOSE_EDITOR:
      return new VehicleViewModel({
        ...fuelingsReducedState,
        editor: null,
      })

    case fuelingActions.FUELING_DELETED: {
      const fuelings = [...fuelingsReducedState.fuelings]
      const index = _.findIndex(fuelings, f => f.id == action.fuelingId)
      fuelings.splice(index, 1)
      return new VehicleViewModel({
        ...fuelingsReducedState,
        fuelings,
      })
    }

    default:
      return fuelingsReducedState
  }
}
