import { expect } from 'chai'
import reducer, { defaultState } from './reducer'
import * as actions from './actions'
import { showError } from '../messages/actions'

function state(props) {
  return {
    ...defaultState,
    ...props,
  }
}

describe('profile reducer', () => {
  it('should signal when profile is being fetched', () => {
    const initialState = state({ authCheckPending: false })
    const action = actions.loadingProfile()
    const nextState = reducer(initialState, action)
    expect(nextState.authCheckPending).to.be.true
  })

  it('should fail auth check', () => {
    const initialState = state({ authCheckPending: true })
    const action = actions.loadProfileFailed()
    const nextState = reducer(initialState, action)
    expect(nextState.authCheckPending).to.be.false
  })

  it('should display login dialog', () => {
    const initialState = state({ showLoginDialog: false })
    const action = actions.openLogin()
    const nextState = reducer(initialState, action)
    expect(nextState.showLoginDialog).to.be.true
  })

  it('should hide login dialog', () => {
    const initialState = state({ showLoginDialog: true })
    const action = actions.closeLogin()
    const nextState = reducer(initialState, action)
    expect(nextState.showLoginDialog).to.be.false
  })

  it('should indicate that user is being logged in', () => {
    const initialState = state({
      authCheckPending: false,
      showLoginDialog: true,
      loginError: 'previous login error',
    })
    const action = actions.loggingIn()
    const nextState = reducer(initialState, action)

    expect(nextState.authCheckPending).to.be.true
    expect(nextState.showLoginDialog).to.be.false
    expect(nextState.loginError).to.be.null
  })

  it('should finish logging in user', () => {
    const initialState = state({
      authCheckPending: true,
      loggedIn: false,
      settings: null,
    })
    const action = actions.loginSuccess({ id: 4 })
    const nextState = reducer(initialState, action)

    expect(nextState.authCheckPending).to.be.false
    expect(nextState.loggedIn).to.be.true
    expect(nextState.settings.id).to.equal(4)
  })

  it('should signal logging out', () => {
    const initialState = state({ loggingOut: false })
    const action = actions.loggingOut()
    const nextState = reducer(initialState, action)
    expect(nextState.loggingOut).to.be.true
  })

  it('should log user the user', () => {
    const initialState = state({
      loggingOut: true,
      loggedIn: true,
      settings: { id: 4 },
    })
    const action = actions.logoutSuccess()
    const nextState = reducer(initialState, action)

    expect(nextState.loggingOut).to.be.false
    expect(nextState.loggedIn).to.be.false
    expect(nextState.settings).to.be.null
  })

  it('should complete any pending operations if an error occurs', () => {
    const initialState = state({
      authCheckPending: true,
      loggingOut: true,
    })
    const action = showError()
    const nextState = reducer(initialState, action)

    expect(nextState.authCheckPending).to.be.false
    expect(nextState.loggingOut).to.be.false
  })
})
