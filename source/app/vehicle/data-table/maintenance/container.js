import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from './actions'
import MaintenanceEntry from './maintenance-entry'
import MaintenanceEditor from './maintenance-editor'

class MaintenanceContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.editMaintenance = this.editMaintenance.bind(this)
    this.saveMaintenance = this.saveMaintenance.bind(this)
    this.cancel = this.cancel.bind(this)
    this.deleteMaintenance = this.deleteMaintenance(this)
  }

  editMaintenance() {
    const { vehicleId, maintenance } = this.props
    this.props.actions.showMaintenanceEditor(vehicleId, maintenance.id)
  }

  saveMaintenance(newMaintenance) {
    const { vehicleId } = this.props
    this.props.actions.saveMaintenance(vehicleId, newMaintenance)
  }

  cancel() {
    const { vehicleId, maintenance } = this.props
    this.props.actions.closeEditor(vehicleId, maintenance.id)
  }

  deleteMaintenance() {
    const { vehicleId, maintenance } = this.props
    this.props.actions.deleteMaintenance(vehicleId, maintenance.id)
  }

  render() {
    const { maintenance } = this.props
    if (maintenance.editing) {
      return <MaintenanceEditor maintenance={maintenance}
                                onSave={this.saveMaintenance}
                                onClose={this.cancel} />
    } else {
      return <MaintenanceEntry maintenance={maintenance}
                               onEdit={this.editMaintenance}
                               onDelete={this.deleteMaintenance} />
    }
  }
}

MaintenanceContainer.propTypes = {
  vehicleId: PropTypes.number,
  maintenance: PropTypes.shape({
    needsAttention: PropTypes.func,
    mechanic: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.any,
  }),
  actions: PropTypes.object,
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

const connectSettings = connect(() => ({}), mapDispatchToProps)
export default connectSettings(MaintenanceContainer)
