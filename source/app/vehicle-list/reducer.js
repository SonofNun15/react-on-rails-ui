import _ from 'lodash'

import { AUTHENTICATED } from '../profile/actions'
import { SHOW_ERROR } from '../messages/actions'
import * as actions from './actions'
import * as vehicleActions from '../vehicle/actions'

import vehicleReducer from '../vehicle/reducer'
import VehicleViewModel from '../view-models/vehicle'

const defaultState = {
  stale: false,
  vehicles: [],
  showVehicleDialog: false,
  editVehicleId: null,
}

export default function vehicleListReducer(state = defaultState, action) {
  if (action.vehicleAction) {
    const vehicles = [...state.vehicles]
    const vehicleId = _.findIndex(vehicles, v => v.id == action.vehicleId)
    vehicles[vehicleId] = vehicleReducer(vehicles[vehicleId], action)
    return {
      ...state,
      vehicles,
    }
  }

  switch(action.type) {
    case actions.OPEN_VEHICLE_DIALOG:
      return {
        ...state,
        showVehicleDialog: true,
      }

    case actions.CLOSE_VEHICLE_DIALOG:
      return {
        ...state,
        showVehicleDialog: false,
      }

    case actions.SAVE_VEHICLE_SUCCESSFUL: {
      let vehicles = [...state.vehicles]
      const newVehicle = new VehicleViewModel(action.newVehicle)
      const index = _.findIndex(vehicles, v => v.id == newVehicle.id)

      if (index >= 0) {
        vehicles[index] = newVehicle
      } else {
        vehicles.push(newVehicle)
      }

      return {
        ...state,
        vehicles,
        showVehicleDialog: false,
      }
    }

    case actions.FETCHING_VEHICLES:
      return {
        ...state,
        gettingVehicles: true,
      }

    case actions.FETCH_VEHICLES_SUCCESS:
      return {
        stale: false,
        vehicles: _.map(action.vehicles, v => new VehicleViewModel(v)),
        gettingVehicles: false,
      }

    case vehicleActions.DELETE_VEHICLE_SUCCESSFUL: {
      let vehicles = [...state.vehicles]
      const index = _.findIndex(vehicles, v => v.id == action.vehicleId)
      vehicles.splice(index, 1)
      return {
        ...state,
        vehicles,
      }
    }

    case SHOW_ERROR:
      return {
        ...state,
        gettingVehicles: false,
      }

    case AUTHENTICATED:
      return {
        ...state,
        stale: true,
      }

    default:
      return state
  }
}
