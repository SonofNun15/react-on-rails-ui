import api from '../../../utilities/api'

import { showError } from '../../../messages/actions'

export const SHOW_FUELING_EDITOR = 'SHOW_FUELING_EDITOR'
export const SAVING_FUELING = 'SAVING_FUELING'
export const FUELING_SAVED = 'FUELING_SAVED'
export const DELETING_FUELING = 'DELETING_FUELING'
export const FUELING_DELETED = 'FUELING_DELETED'
export const CLOSE_FUELING_EDITOR = 'CLOSE_FUELING_EDITOR'

export function showFuelingEditor(vehicleId, fuelingId) {
  return { type: SHOW_FUELING_EDITOR, vehicleId, fuelingId }
}

export function saveFueling(vehicleId, fueling) {
  return dispatch => {
    dispatch(savingFueling(vehicleId, fueling.id))
    return api.saveFueling(vehicleId, fueling).then(newFueling => {
      dispatch(fuelingSaved(vehicleId, newFueling))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function savingFueling(vehicleId, fuelingId) {
  return { type: SAVING_FUELING, vehicleId, fuelingId }
}

function fuelingSaved(vehicleId, fueling) {
  return {
    type: FUELING_SAVED,
    vehicleId,
    fuelingId: fueling.id,
    fueling
  }
}

export function deleteFueling(vehicleId, fuelingId) {
  return dispatch => {
    dispatch(deletingFueling(vehicleId, fuelingId))
    return api.deleteFueling(vehicleId, fuelingId).then(() => {
      dispatch(fuelingDeleted(vehicleId, fuelingId))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function deletingFueling(vehicleId, fuelingId) {
  return { type: DELETING_FUELING, vehicleId, fuelingId }
}

function fuelingDeleted(vehicleId, fuelingId) {
  return { type: FUELING_DELETED, vehicleId, fuelingId }
}

export function closeEditor(vehicleId, fuelingId) {
  return { type: CLOSE_FUELING_EDITOR, vehicleId, fuelingId }
}
