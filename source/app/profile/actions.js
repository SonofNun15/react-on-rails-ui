import api from '../utilities/api'
import { push } from 'react-router-redux'

import { showError } from '../messages/actions'

export const FETCHING_PROFILE = 'FETCHING_PROFILE'
export const FETCH_PROFILE_FAILED = 'FETCH_PROFILE_FAILED'
export const OPEN_LOGIN = 'OPEN_LOGIN'
export const CLOSE_LOGIN = 'CLOSE_LOGIN'
export const LOGGING_IN = 'LOGGING_IN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGGING_OUT = 'LOGGING_OUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const AUTHENTICATED = 'AUTHENTICATED'

export function getProfile() {
  return dispatch => {
    dispatch(loadingProfile())
    return api.getProfile().then(profile => {
      dispatch(loginSuccess(profile))
      dispatch(authenticated())
    }).catch(() => {
      dispatch(loadProfileFailed())
    })
  }
}

export function loadingProfile() {
  return { type: FETCHING_PROFILE }
}

export function loadProfileFailed() {
  return { type: FETCH_PROFILE_FAILED }
}

function authenticated() {
  return { type: AUTHENTICATED }
}

export function openLogin() {
  return { type: OPEN_LOGIN }
}
export function closeLogin() {
  return { type: CLOSE_LOGIN }
}

export function login(email, password) {
  return dispatch => {
    dispatch(loggingIn())
    return api.login(email, password).then(profile => {
      dispatch(loginSuccess(profile))
      dispatch(authenticated())
      dispatch(push('/'))
    }).catch(() => {
      dispatch(showError('Login failed'))
    })
  }
}

export function loggingIn() {
  return { type: LOGGING_IN }
}

export function loginSuccess(profile) {
  return { type: LOGIN_SUCCESS, profile }
}

export function logout() {
  return dispatch => {
    dispatch(loggingOut())
    return api.logout().then(() => {
      dispatch(logoutSuccess())
    }).catch(error => {
      dispatch(showError(error))
    })
  }
}

export function loggingOut() {
  return { type: LOGGING_OUT }
}

export function logoutSuccess() {
  return { type: LOGOUT_SUCCESS }
}
