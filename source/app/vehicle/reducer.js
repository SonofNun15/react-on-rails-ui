import _ from 'lodash'

import * as actions from './actions'
import * as fuelingActions from './data-table/fueling/actions'
import * as maintenanceActions from './data-table/maintenance/actions'
import fuelingReducer from './data-table/fueling/reducer'
import maintenanceReducer from './data-table/maintenance/reducer'

import VehicleViewModel from '../view-models/vehicle'
import FuelingViewModel from '../view-models/fueling'
import MaintenanceViewModel from '../view-models/maintenance'

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

function reduceMaintenance(maintenance, action) {
  const index = _.findIndex(maintenance, m => m.id == action.maintenanceId)
  if (index >= 0) {
    let clone = [...maintenance]
    clone[index] = maintenanceReducer(maintenance[index], action)
    return clone
  } else {
    return maintenance
  }
}

export default function vehicleReducer(state, action) {
  const fuelingsReducedState = action.fuelingId != null
    ? new VehicleViewModel({ ...state, fuelings: reduceFuelings(state.fuelings, action) })
    : state

  const maintenanceReducedState = action.maintenanceId != null
    ? new VehicleViewModel({
        ...fuelingsReducedState,
        maintenance: reduceMaintenance(fuelingsReducedState.maintenance, action)
      })
    : fuelingsReducedState

  switch(action.type) {
    case actions.SHOW_NEW_FUELING_EDITOR:
      return new VehicleViewModel({
        ...maintenanceReducedState,
        editor: Fueling,
      })

    case actions.CREATING_FUELING:
      return new VehicleViewModel({
        ...maintenanceReducedState,
        savingFueling: true,
      })

    case actions.FUELING_CREATED: {
      const fuelings = [
        new FuelingViewModel(action.fueling),
        ...maintenanceReducedState.fuelings,
      ]
      return new VehicleViewModel({
        ...maintenanceReducedState,
        fuelings,
        editor: null,
      })
    }

    case actions.SHOW_NEW_MAINTENANCE_EDITOR:
      return new VehicleViewModel({
        ...maintenanceReducedState,
        editor: Maintenance,
      })

    case actions.MAINTENANCE_CREATED: {
      const maintenance = [
        new MaintenanceViewModel(action.maintenance),
        ...maintenanceReducedState.maintenance,
      ]
      return new VehicleViewModel({
        ...maintenanceReducedState,
        maintenance,
        editor: null,
      })
     }

    case actions.CREATING_MAINTENANCE:
      return new VehicleViewModel({
        ...maintenanceReducedState,
        savingMaintenance: true,
      })

    case actions.CLOSE_EDITOR:
      return new VehicleViewModel({
        ...maintenanceReducedState,
        editor: null,
      })

    case fuelingActions.FUELING_DELETED: {
      const fuelings = [...maintenanceReducedState.fuelings]
      const index = _.findIndex(fuelings, f => f.id == action.fuelingId)
      fuelings.splice(index, 1)
      return new VehicleViewModel({
        ...maintenanceReducedState,
        fuelings,
      })
    }

    case maintenanceActions.MAINTENANCE_DELETED: {
      const maintenance = [...maintenanceReducedState.maintenance]
      const index = _.findIndex(maintenance, m => m.id == action.maintenanceId)
      maintenance.splice(index, 1)
      return new VehicleViewModel({
        ...maintenanceReducedState,
        maintenance,
      })
    }

    default:
      return maintenanceReducedState
  }
}
