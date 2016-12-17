import { createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducer'

import thunk from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { routerMiddleware } from 'react-router-redux'

export function configureStore(history, initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...getMiddleware(history))
  )
}

let appStore

export function setStore(store) {
  appStore = store
}

export function getStore() {
  return appStore
}

function getMiddleware(history) {
  return [
    thunk,
    routerMiddleware(history),
    reduxImmutableStateInvariant(),
  ]
}
