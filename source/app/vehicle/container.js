import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import * as listActionCreators from '../vehicle-list/actions'
import * as actionCreators from './actions'
import VehicleDialog from '../vehicle-dialog/dialog'
import VehicleDetails from './vehicle'

class VehicleContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.editVehicle = this.editVehicle.bind(this)
    this.saveVehicle = this.saveVehicle.bind(this)
    this.closeVehicleDialog = this.closeVehicleDialog.bind(this)
    this.deleteVehicle = this.deleteVehicle.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vehicle == null) {
      nextProps.dispatch(push('/'))
    }
  }

  editVehicle() {
    this.props.listActions.openVehicleDialog()
  }

  saveVehicle(vehicleEdits) {
    this.props.listActions.saveVehicle(vehicleEdits)
  }

  closeVehicleDialog() {
    this.props.listActions.closeVehicleDialog()
  }

  deleteVehicle() {
    const { actions, id } = this.props
    actions.deleteVehicle(id)
  }

  render() {
    const { vehicle, showVehicleDialog } = this.props
    if (vehicle) {
      return (
        <div>
          <VehicleDetails vehicle={vehicle}
                          onEdit={this.editVehicle}
                          onDelete={this.deleteVehicle} />
          <VehicleDialog vehicle={vehicle}
                         show={showVehicleDialog}
                         onCreate={this.saveVehicle}
                         onClose={this.closeVehicleDialog} />
        </div>
      )
    } else {
      return <span>LOADING, please wait...</span>
    }
  }
}

VehicleContainer.propTypes = {
  vehicle: PropTypes.object,
  id: PropTypes.number,
  showVehicleDialog: PropTypes.bool,
  actions: PropTypes.object,
  listActions: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  let { params: { id } } = ownProps
  id = parseInt(id)
  const vehicle = state.vehicleList.vehicles.find(v => v.id == id)

  return {
    vehicle,
    id,
    showVehicleDialog: state.vehicleList.showVehicleDialog,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
    listActions: bindActionCreators(listActionCreators, dispatch),
  }
}

const connectSettings = connect(mapStateToProps, mapDispatchToProps)
export default connectSettings(VehicleContainer)
