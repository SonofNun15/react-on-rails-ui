import * as actions from './actions'
import * as messageActions from '../messages/actions'

const defaultState = {
  loggedIn: false,
  loggingOut: false,
  authCheckPending: true,
  settings: null,
  showLoginDialog: false,
  loginError: null,
}

export default function profileReducer(state = defaultState, action) {
  switch(action.type) {
    case actions.FETCHING_PROFILE:
      return {
        ...state,
        authCheckPending: true,
      }

    case actions.FETCH_PROFILE_SUCCESS: {
      const loggedIn = action.profile != null
      return {
        authCheckPending: false,
        loggedIn,
        settings: action.profile,
      }
    }

    case actions.FETCH_PROFILE_FAILED:
      return {
        ...state,
        authCheckPending: false,
      }

    case actions.OPEN_LOGIN:
      return {
        ...state,
        showLoginDialog: true,
      }

    case actions.CLOSE_LOGIN:
      return {
        ...state,
        showLoginDialog: false,
      }

    case actions.LOGGING_IN:
      return {
        ...state,
        authCheckPending: true,
        showLoginDialog: false,
        loginError: null,
      }

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        authCheckPending: false,
        loggedIn: true,
        settings: action.profile,
      }

    case actions.LOGGING_OUT:
      return {
        ...state,
        loggingOut: true,
      }

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        loggedIn: false,
        settings: null,
      }

    case messageActions.SHOW_ERROR:
      return {
        ...state,
        authCheckPending: false,
        loggingOut: false,
      }

    default:
      return state
  }
}
