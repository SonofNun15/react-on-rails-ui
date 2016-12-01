import { AUTHENTICATED } from '../profile/actions'
import * as actions from './actions'
import { SHOW_ERROR } from '../messages/actions'

const defaultState = {
  stale: false,
  vehicles: [],
  showVehicleDialog: false,
}

export default function vehicleListReducer(state = defaultState, action) {
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

    case actions.CREATE_VEHICLE_SUCCESSFUL:
      return {
        ...state,
        vehicles: [
          ...state.vehicles,
          action.newVehicle,
        ],
        showVehicleDialog: false,
      }

    case actions.FETCHING_VEHICLES:
      return {
        ...state,
        gettingVehicles: true,
      }

    case actions.FETCH_VEHICLES_SUCCESS:
      return {
        stale: false,
        vehicles: action.vehicles,
        gettingVehicles: false,
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
