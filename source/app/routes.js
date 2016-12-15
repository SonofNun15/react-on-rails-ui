import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app'

import VehicleLoader from './utilities/vehicle-loader'
import VehicleListContainer from './vehicle-list/container'
import VehicleContainer from './vehicle/container'

import UserEditorContainer from './user-editor/container'

import { requireAuthentication } from './profile/authentication'

export default (
  <Route path="/" component={App}>
    <Route component={VehicleLoader}>
      <IndexRoute component={VehicleListContainer} />
    </Route>

    <Route path="vehicles" component={VehicleLoader}>
      <Route path=":id" component={requireAuthentication(VehicleContainer)} />
      <IndexRoute component={VehicleListContainer} />
    </Route>

    <Route path="profile" component={requireAuthentication(UserEditorContainer)} />
    <Route path="register" component={UserEditorContainer} />
    <Route path="password" component={requireAuthentication(UserEditorContainer)} />
  </Route>
)
