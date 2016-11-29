import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from './app/routes'

import configureStore from './app/redux/configure-store'

import { getProfile } from './app/profile/actions'

import './styles'

const store = configureStore()
store.dispatch(getProfile())

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
