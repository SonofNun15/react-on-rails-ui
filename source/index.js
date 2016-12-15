import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './app/routes'

import configureStore from './app/redux/configure-store'

import { getProfile } from './app/profile/actions'

import './styles'

const store = configureStore(browserHistory)
store.dispatch(getProfile())

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
