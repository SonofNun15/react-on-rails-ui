import api from '../utilities/api'

export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLE_SUCCESS'

export function loadVehicles() {
  return dispatch => {
    return api.getVehicles().then(vehicles => {
      dispatch(loadVehiclesSuccess(vehicles))
    }).catch(error => {
      throw error
    })
  }
}

function loadVehiclesSuccess(vehicles) {
  return { type: FETCH_VEHICLES_SUCCESS, vehicles }
}
