import api from '../utilities/api'

import { showError } from '../messages/actions'

export const OPEN_VEHICLE_DIALOG = 'OPEN_VEHICLE_DIALOG'
export const CLOSE_VEHICLE_DIALOG = 'CLOSE_VEHICLE_DIALOG'
export const CREATE_VEHICLE_SUCCESSFUL = 'CREATE_VEHICLE_SUCCESSFUL'
export const FETCHING_VEHICLES = 'FETCHING_VEHICLES'
export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLE_SUCCESS'

export function openVehicleDialog() {
  return { type: OPEN_VEHICLE_DIALOG }
}

export function closeVehicleDialog() {
  return { type: CLOSE_VEHICLE_DIALOG }
}

export function createVehicle(vehicle) {
  return dispatch => {
    return api.createVehicle(vehicle).then(vehicle => {
      dispatch(createVehicleSuccess(vehicle))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function createVehicleSuccess(vehicle) {
  return { type: CREATE_VEHICLE_SUCCESSFUL, newVehicle: vehicle }
}

export function loadVehicles() {
  return dispatch => {
    dispatch(loadingVehicles())
    return api.getVehicles().then(vehicles => {
      dispatch(loadVehiclesSuccess(vehicles))
    }).catch(error => {
      throw error
    })
  }
}

function loadingVehicles() {
  return { type: FETCHING_VEHICLES }
}

function loadVehiclesSuccess(vehicles) {
  return { type: FETCH_VEHICLES_SUCCESS, vehicles }
}
