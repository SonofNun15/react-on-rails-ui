import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
  }

  addFueling() {
    const { vehicleId } = this.props
    this.props.actions.showFuelingEditor(vehicleId)
  }

  saveFueling(fueling) {
    const { vehicleId } = this.props
    this.props.actions.saveFueling(vehicleId, fueling)
  }

  addMaintenance() {
    const { vehicleId } = this.props
    this.props.actions.showMaintenanceEditor(vehicleId)
  }

  saveMaintenance(maintenance) {
    const { vehicleId } = this.props
    this.props.actions.saveMaintenance(vehicleId, maintenance)
  }

  close() {
    const { vehicleId } = this.props
    this.props.actions.closeEditor(vehicleId)
  }

  render() {
    const { editor } = this.props
    return (
      <DataEntry onAddFueling={this.addFueling} onSaveFueling={this.saveFueling}
                 onAddMaintenance={this.addMaintenance} onSaveMaintenance={this.saveMaintenance}
                 onClose={this.close}
                 editor={editor} />
    )
  }
}

DataEntryContainer.propTypes = {
  vehicleId: PropTypes.number,
  editor: PropTypes.any,
  actions: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  let { vehicleId: id } = ownProps
  const vehicle = state.vehicleList.vehicles.find(v => v.id == id)

  return {
    editor: vehicle.editor,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

const connectSettings = connect(mapStateToProps, mapDispatchToProps)
export default connectSettings(DataEntryContainer)
