import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showError } from '../../../messages/actions'

import * as actionCreators from '../../actions'
import DataEntry from './data-entry'

class DataEntryContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.addFueling = this.addFueling.bind(this)
    this.saveFueling = this.saveFueling.bind(this)
    this.addMaintenance = this.addMaintenance.bind(this)
    this.saveMaintenance = this.saveMaintenance.bind(this)
    this.close = this.close.bind(this)
    this.showError = this.showError.bind(this)
  }

  addFueling() {
    const { vehicleId } = this.props
    this.props.actions.showNewFuelingEditor(vehicleId)
  }

  saveFueling(fueling) {
    const { vehicleId } = this.props
    this.props.actions.createFueling(vehicleId, fueling)
  }

  addMaintenance() {
    const { vehicleId } = this.props
    this.props.actions.showNewMaintenanceEditor(vehicleId)
  }

  saveMaintenance(maintenance) {
    const { vehicleId } = this.props
    this.props.actions.createMaintenance(vehicleId, maintenance)
  }

  close() {
    const { vehicleId } = this.props
    this.props.actions.closeEditor(vehicleId)
  }

  showError(error) {
    this.props.showError(error)
  }

  render() {
    const { editor } = this.props
    return (
      <DataEntry onAddFueling={this.addFueling} onSaveFueling={this.saveFueling}
                 onAddMaintenance={this.addMaintenance} onSaveMaintenance={this.saveMaintenance}
                 onClose={this.close} onError={this.showError}
                 editor={editor} />
    )
  }
}

DataEntryContainer.propTypes = {
  vehicleId: PropTypes.number,
  editor: PropTypes.any,
  actions: PropTypes.object,
  showError: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  let { vehicleId: id } = ownProps
  const vehicle = state.vehicleList.vehicles.find(v => v.id == id)

  return {
    editor: (vehicle != null ? vehicle.editor : null),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
    showError: error => dispatch(showError(error)),
  }
}

const connectSettings = connect(mapStateToProps, mapDispatchToProps)
export default connectSettings(DataEntryContainer)
