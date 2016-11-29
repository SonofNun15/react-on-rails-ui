import { FETCH_VEHICLES_SUCCESS } from './actions'

export default function vehicleListReducer(state = [], action) {
  switch(action.type) {
    case FETCH_VEHICLES_SUCCESS:
      return action.vehicles

    default:
      return state
  }
}
