import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showError } from '../../../messages/actions'

import * as actionCreators from './actions'
import FuelingEntry from './fueling-entry'
import FuelingEditor from './fueling-editor'

class FuelingContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.editFueling = this.editFueling.bind(this)
    this.saveFueling = this.saveFueling.bind(this)
    this.cancel = this.cancel.bind(this)
    this.deleteFueling = this.deleteFueling.bind(this)
    this.showError = this.showError.bind(this)
  }

  editFueling() {
    const { vehicleId, fueling } = this.props
    this.props.actions.showFuelingEditor(vehicleId, fueling.id)
  }

  saveFueling(newFueling) {
    const { vehicleId } = this.props
    this.props.actions.saveFueling(vehicleId, newFueling)
  }

  cancel() {
    const { vehicleId, fueling } = this.props
    this.props.actions.closeEditor(vehicleId, fueling.id)
  }

  deleteFueling() {
    const { vehicleId, fueling } = this.props
    this.props.actions.deleteFueling(vehicleId, fueling.id)
  }

  showError(error) {
    this.props.showError(error)
  }

  render() {
    const { fueling } = this.props
    const fuelingControl = fueling.editing
      ? <FuelingEditor fueling={fueling}
                       onSave={this.saveFueling}
                       onClose={this.cancel}
                       onError={this.showError} />
      : <FuelingEntry fueling={fueling}
                      onEdit={this.editFueling}
                      onDelete={this.deleteFueling} />
    return <div className="entry">{fuelingControl}</div>
  }
}

FuelingContainer.propTypes = {
  vehicleId: PropTypes.number,
  fueling: PropTypes.shape({
    aboveAverageMPG: PropTypes.func,
    mpg: PropTypes.func,
    miles: PropTypes.number,
    date: PropTypes.any,
  }),
  actions: PropTypes.object,
  showError: PropTypes.func,
}

const mapStateToProps = () => ({})

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
    showError: error => dispatch(showError(error)),
  }
}

const connectSettings = connect(mapStateToProps, mapDispatchToProps)
export default connectSettings(FuelingContainer)
