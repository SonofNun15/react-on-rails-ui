import api from '../utilities/api'

import { showError } from '../messages/actions'

export const DELETE_VEHICLE_SUCCESSFUL = 'DELETE_VEHICLE_SUCCESSFUL'
export const SHOW_FUELING_EDITOR = 'SHOW_FUELING_EDITOR'
export const SAVING_FUELING = 'SAVING_FUELING'
export const FUELING_SAVED = 'FUELING_SAVED'
export const SHOW_MAINTENANCE_EDITOR = 'SHOW_MAINTENANCE_EDITOR'
export const SAVING_MAINTENANCE = 'SAVING_MAINTENANCE'
export const MAINTENANCE_SAVED = 'MAINTENANCE_SAVED'
export const CLOSE_EDITOR = 'CLOSE_EDITOR'

export function deleteVehicle(id) {
  return dispatch => {
    return api.deleteVehicle(id).then(() => {
      dispatch(deleteVehicleSuccessful(id))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

export function deleteVehicleSuccessful(vehicleId) {
  return { type: DELETE_VEHICLE_SUCCESSFUL, vehicleId }
}

export function showFuelingEditor(vehicleId) {
  return {
    vehicleAction: true,
    type: SHOW_FUELING_EDITOR,
    vehicleId,
  }
}

export function showMaintenanceEditor(vehicleId) {
  return {
    vehicleAction: true,
    type: SHOW_MAINTENANCE_EDITOR,
    vehicleId,
  }
}

export function closeEditor(vehicleId) {
  return {
    vehicleAction: true,
    type: CLOSE_EDITOR,
    vehicleId,
  }
}

export function saveFueling(vehicleId, fueling) {
  return dispatch => {
    dispatch(savingFueling(vehicleId))
    return api.saveFueling(vehicleId, fueling).then(newFueling => {
      dispatch(fuelingSaved(vehicleId, newFueling))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function savingFueling(vehicleId) {
  return {
    vehicleAction: true,
    type: SAVING_FUELING,
    vehicleId,
  }
}

function fuelingSaved(vehicleId, fueling) {
  return {
    vehicleAction: true,
    type: FUELING_SAVED,
    vehicleId,
    fueling,
  }
}

export function saveMaintenance(vehicleId, maintenance) {
  return dispatch => {
    dispatch(savingMaintenance(vehicleId))
    return api.saveMaintenance(vehicleId, maintenance).then(newMaintenance => {
      dispatch(maintenanceSaved(vehicleId, newMaintenance))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function savingMaintenance(vehicleId) {
  return {
    vehicleAction: true,
    type: SAVING_MAINTENANCE,
    vehicleId,
  }
}

function maintenanceSaved(vehicleId, maintenance) {
  return {
    vehicleAction: true,
    type: MAINTENANCE_SAVED,
    vehicleId,
    maintenance,
  }
}

