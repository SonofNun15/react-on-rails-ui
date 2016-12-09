import api from '../../../utilities/api'

import { showError } from '../../../messages/actions'

export const SHOW_MAINTENANCE_EDITOR = 'SHOW_MAINTENANCE_EDITOR'
export const SAVING_MAINTENANCE = 'SAVING_MAINTENANCE'
export const MAINTENANCE_SAVED = 'MAINTENANCE_SAVED'
export const DELETING_MAINTENANCE = 'DELETING_MAINTENANCE'
export const MAINTENANCE_DELETED = 'MAINTENANCE_DELETED'

export function showMaintenanceEditor(vehicleId, maintenanceId) {
  return {
    vehicleAction: true,
    type: SHOW_MAINTENANCE_EDITOR,
    vehicleId,
    maintenanceId,
  }
}

export function saveMaintenance(vehicleId, maintenance) {
  return dispatch => {
    dispatch(savingMaintenance(vehicleId, maintenance.id))
    return api.saveMaintenance(vehicleId, maintenance).then(newMaintenance => {
      dispatch(maintenanceSaved(vehicleId, newMaintenance))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function savingMaintenance(vehicleId, maintenanceId) {
  return {
    vehicleAction: true,
    type: SAVING_MAINTENANCE,
    vehicleId,
    maintenanceId,
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

export function deleteMaintenance(vehicleId, maintenanceId) {
  return dispatch => {
    dispatch(deletingMaintenance(vehicleId, maintenanceId))
    return api.deleteMaintenance(vehicleId, maintenanceId).then(() => {
      dispatch(maintenanceDeleted(vehicleId, maintenanceId))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function deletingMaintenance(vehicleId, maintenanceId) {
  return {
    vehicleAction: true,
    type: DELETING_MAINTENANCE,
    vehicleId,
    maintenanceId,
  }
}

function maintenanceDeleted(vehicleId, maintenanceId) {
  return {
    vehicleAction: true,
    type: MAINTENANCE_DELETED,
    vehicleId,
    maintenanceId,
  }
}
