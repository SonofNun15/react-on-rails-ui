import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as vehicleActions from './actions'
import VehicleList from './list'
import VehicleDialog from '../vehicle-dialog/dialog'
import Welcome from '../welcome/welcome'

class VehicleContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.addVehicle = this.addVehicle.bind(this)
    this.closeVehicleDialog = this.closeVehicleDialog.bind(this)
    this.saveVehicle = this.saveVehicle.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { stale } = nextProps
    if (stale) {
      this.props.actions.loadVehicles()
    }
  }

  addVehicle() {
    this.props.actions.openVehicleDialog()
  }

  closeVehicleDialog() {
    this.props.actions.closeVehicleDialog()
  }

  saveVehicle(vehicle) {
    this.props.actions.createVehicle(vehicle)
  }

  render() {
    const { loggedIn, gettingVehicles,
            vehicles, showVehicleDialog } = this.props

    if (loggedIn) {
      return (
        <div>
          <VehicleList loading={gettingVehicles} vehicles={vehicles}
                       onAddVehicle={this.addVehicle} />
          <VehicleDialog show={showVehicleDialog}
                         onCreate={this.saveVehicle}
                         onClose={this.closeVehicleDialog} />
        </div>
      )
    } else {
      return <Welcome />
    }
  }
}

VehicleContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  stale: PropTypes.bool,
  vehicles: PropTypes.array.isRequired,
  gettingVehicles: PropTypes.bool,
  showVehicleDialog: PropTypes.bool,
  actions: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    loggedIn: state.profile.loggedIn,
    stale: state.vehicleList.stale,
    vehicles: state.vehicleList.vehicles,
    gettingVehicles: state.vehicleList.gettingVehicles,
    showVehicleDialog: state.vehicleList.showVehicleDialog,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(vehicleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleContainer)
