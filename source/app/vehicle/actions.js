import api from '../utilities/api'

import { showError } from '../messages/actions'

export const DELETE_VEHICLE_SUCCESSFUL = 'DELETE_VEHICLE_SUCCESSFUL'
export const SHOW_NEW_FUELING_EDITOR = 'SHOW_NEW_FUELING_EDITOR'
export const CREATING_FUELING = 'CREATING_FUELING'
export const FUELING_CREATED = 'FUELING_CREATED'
export const SHOW_NEW_MAINTENANCE_EDITOR = 'SHOW_NEW_MAINTENANCE_EDITOR'
export const CREATING_MAINTENANCE = 'CREATING_MAINTENANCE'
export const MAINTENANCE_CREATED = 'MAINTENANCE_CREATED'
export const CLOSE_EDITOR = 'CLOSE_EDITOR'

export function deleteVehicle(id) {
  return dispatch => {
    return api.deleteVehicle(id).then(() => {
      dispatch(deleteVehicleSuccessful(id))
    }).catch(() => {
      dispatch(showEurror('Failed to delete vehicle'))
    })
  }
}

export function deleteVehicleSuccessful(vehicleId) {
  return { type: DELETE_VEHICLE_SUCCESSFUL, vehicleId }
}

export function showNewFuelingEditor(vehicleId) {
  return { type: SHOW_NEW_FUELING_EDITOR, vehicleId }
}

export function showNewMaintenanceEditor(vehicleId) {
  return { type: SHOW_NEW_MAINTENANCE_EDITOR, vehicleId }
}

export function closeEditor(vehicleId) {
  return { type: CLOSE_EDITOR, vehicleId }
}

export function createFueling(vehicleId, fueling) {
  return dispatch => {
    dispatch(creatingFueling(vehicleId))
    return api.saveFueling(vehicleId, fueling).then(newFueling => {
      dispatch(fuelingCreated(vehicleId, newFueling))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function creatingFueling(vehicleId) {
  return { type: CREATING_FUELING, vehicleId }
}

function fuelingCreated(vehicleId, fueling) {
  return { type: FUELING_CREATED, vehicleId, fueling }
}

export function createMaintenance(vehicleId, maintenance) {
  return dispatch => {
    dispatch(creatingMaintenance(vehicleId))
    return api.saveMaintenance(vehicleId, maintenance).then(newMaintenance => {
      dispatch(maintenanceCreated(vehicleId, newMaintenance))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function creatingMaintenance(vehicleId) {
  return { type: CREATING_MAINTENANCE, vehicleId }
}

function maintenanceCreated(vehicleId, maintenance) {
  return { type: MAINTENANCE_CREATED, vehicleId, maintenance }
}
