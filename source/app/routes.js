import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app'

import Vehicle from './vehicle/vehicle'
import VehicleContainer from './vehicle-list/container'
import VehicleDetail from './vehicle/detail/detail'
import VehicleEditor from './vehicle/editor/editor'

import UserEditor from './user-editor/editor'

import { requireAuthentication } from './profile/authentication'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={VehicleContainer} />

    <Route path="vehicles/new" component={requireAuthentication(VehicleEditor)} />
    <Route path="vehicles/:id" component={requireAuthentication(Vehicle)}>
      <IndexRoute component={VehicleDetail} />
      <Route path="edit" component={VehicleEditor} />
    </Route>
    <Route path="vehicles" component={VehicleContainer} />

    <Route path="profile" component={requireAuthentication(UserEditor)} />
    <Route path="register" component={UserEditor} />
    <Route path="password" component={requireAuthentication(UserEditor)} />
  </Route>
)
