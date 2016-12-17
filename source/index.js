import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './app/routes'

import { configureStore, setStore } from './app/redux/store'

import { getProfile } from './app/profile/actions'

import './styles'

const store = configureStore(browserHistory)
setStore(store)

store.dispatch(getProfile())


const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
