import { createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducer'

import thunk from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...getMiddleware())
  )
}

function getMiddleware() {
  return [
    thunk,
    routerMiddleware(browserHistory),
    reduxImmutableStateInvariant(),
  ]
}
