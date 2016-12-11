import api from '../../../utilities/api'

import { showError } from '../../../messages/actions'

export const SHOW_MAINTENANCE_EDITOR = 'SHOW_MAINTENANCE_EDITOR'
export const SAVING_MAINTENANCE = 'SAVING_MAINTENANCE'
export const MAINTENANCE_SAVED = 'MAINTENANCE_SAVED'
export const DELETING_MAINTENANCE = 'DELETING_MAINTENANCE'
export const MAINTENANCE_DELETED = 'MAINTENANCE_DELETED'
export const CLOSE_MAINTENANCE_EDITOR = 'CLOSE_MAINTENANCE_EDITOR'

export function showMaintenanceEditor(vehicleId, maintenanceId) {
  return { type: SHOW_MAINTENANCE_EDITOR, vehicleId, maintenanceId }
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
  return { type: SAVING_MAINTENANCE, vehicleId, maintenanceId }
}

function maintenanceSaved(vehicleId, maintenance) {
  return {
    type: MAINTENANCE_SAVED,
    vehicleId,
    maintenanceId: maintenance.id,
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
  return { type: DELETING_MAINTENANCE, vehicleId, maintenanceId }
}

function maintenanceDeleted(vehicleId, maintenanceId) {
  return { type: MAINTENANCE_DELETED, vehicleId, maintenanceId }
}

export function closeEditor(vehicleId, maintenanceId) {
  return { type: CLOSE_MAINTENANCE_EDITOR, vehicleId, maintenanceId }
}
