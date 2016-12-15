import api from '../utilities/api'
import { push } from 'react-router-redux'

import { loadProfileSuccess } from '../profile/actions'
import { showError } from '../messages/actions'

export const CREATING_USER = 'CREATING_USER'

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
