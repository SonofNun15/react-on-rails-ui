import api from '../utilities/api'
import { push } from 'react-router-redux'

import { loadProfileSuccess } from '../profile/actions'
import { showError } from '../messages/actions'

export const CREATING_USER = 'CREATING_USER'
export const SAVING_USER = 'SAVING_USER'
export const SHOW_PASSWORD_DIALOG = 'SHOW_PASSWORD_DIALOG'
export const CHANGING_PASSWORD = 'CHANGING_PASSWORD'
export const CLOSE_PASSWORD_DIALOG = 'CLOSE_PASSWORD_DIALOG'

export function createUser(newUser) {
  return dispatch => {
    dispatch(creatingUser())
    return api.createUser(newUser).then(user => {
      dispatch(loadProfileSuccess(user))
      dispatch(push('/'))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function creatingUser() {
  return { type: CREATING_USER }
}

export function saveUser(user) {
  return dispatch => {
    dispatch(savingUser())
    return api.saveUser(user).then(user => {
      dispatch(loadProfileSuccess(user))
      dispatch(push('/'))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function savingUser() {
  return { type: SAVING_USER }
}

export function showPasswordEditDialog() {
  return { type: SHOW_PASSWORD_DIALOG }
}

export function changePassword(newPassword) {
  return dispatch => {
    dispatch(changingPassword())
    return api.changePassword(newPassword).then(() => {
      dispatch(closePasswordEditDialog())
      dispatch(push('/'))
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

function changingPassword() {
  return { type: CHANGING_PASSWORD }
}

export function closePasswordEditDialog() {
  return { type: CLOSE_PASSWORD_DIALOG }
}
