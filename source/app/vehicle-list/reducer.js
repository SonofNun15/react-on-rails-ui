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

function reduceVehicle(vehicles, action) {
  const vehicleIndex = _.findIndex(vehicles, v => v.id == action.vehicleId)
  if (vehicleIndex >= 0) {
    let clone = [...vehicles]
    clone[vehicleIndex] = vehicleReducer(vehicles[vehicleIndex], action)
    return clone
  } else {
    return vehicles
  }
}

export default function vehicleListReducer(state = defaultState, action) {
  const vehiclesReducedState = action.vehicleId != null
    ? { ...state, vehicles: reduceVehicle(state.vehicles, action) }
    : state

  switch(action.type) {
    case actions.OPEN_VEHICLE_DIALOG:
      return {
        ...vehiclesReducedState,
        showVehicleDialog: true,
      }

    case actions.CLOSE_VEHICLE_DIALOG:
      return {
        ...vehiclesReducedState,
        showVehicleDialog: false,
      }

    case actions.SAVE_VEHICLE_SUCCESSFUL: {
      let vehicles = [...vehiclesReducedState.vehicles]
      const newVehicle = new VehicleViewModel(action.newVehicle)
      const index = _.findIndex(vehicles, v => v.id == newVehicle.id)

      if (index >= 0) {
        vehicles[index] = newVehicle
      } else {
        vehicles.push(newVehicle)
      }

      return {
        ...vehiclesReducedState,
        vehicles,
        showVehicleDialog: false,
      }
    }

    case actions.FETCHING_VEHICLES:
      return {
        ...vehiclesReducedState,
        gettingVehicles: true,
      }

    case actions.FETCH_VEHICLES_SUCCESS:
      return {
        stale: false,
        vehicles: _.map(action.vehicles, v => new VehicleViewModel(v)),
        gettingVehicles: false,
      }

    case vehicleActions.DELETE_VEHICLE_SUCCESSFUL: {
      let vehicles = [...vehiclesReducedState.vehicles]
      const index = _.findIndex(vehicles, v => v.id == action.vehicleId)
      vehicles.splice(index, 1)
      return {
        ...vehiclesReducedState,
        vehicles,
      }
    }

    case SHOW_ERROR:
      return {
        ...vehiclesReducedState,
        gettingVehicles: false,
      }

    case AUTHENTICATED:
      return {
        ...vehiclesReducedState,
        stale: true,
      }

    default:
      return vehiclesReducedState
  }
}
