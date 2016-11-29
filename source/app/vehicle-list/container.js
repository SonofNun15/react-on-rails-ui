import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as vehicleActions from './actions'
import VehicleList from './list'
import Welcome from '../welcome/welcome'

class VehicleContainer extends React.Component {
  render() {
    const { loggedIn, vehicles } = this.props

    if (loggedIn) {
      return (
        <VehicleList vehicles={vehicles} />
      )
    } else {
      return <Welcome />
    }
  }
}

VehicleContainer.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  vehicles: React.PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    loggedIn: state.profile.loggedIn,
    vehicles: state.vehicleList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(vehicleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleContainer)
