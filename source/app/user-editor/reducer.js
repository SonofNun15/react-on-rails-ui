import * as actions from './actions'

const defaultState = {
  showPasswordDialog: false,
}

export default function profileReducer(state = defaultState, action) {
  switch(action.type) {
    case actions.SHOW_PASSWORD_DIALOG:
      return {
        ...state,
        showPasswordDialog: true,
      }

    case actions.CLOSE_PASSWORD_DIALOG:
      return {
        ...state,
        showPasswordDialog: false,
      }

    default:
      return state
  }
}
