import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../vehicle-list/actions'

class VehicleLoader extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { stale } = nextProps
    if (stale) {
      this.props.actions.loadVehicles()
    }
  }

  render() {
    return this.props.children
  }
}

VehicleLoader.propTypes = {
  children: PropTypes.object.isRequired,
  actions: PropTypes.object,
}

function mapStateToProps(state) {
  return { stale: state.vehicleList.stale }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

const connectSettings = connect(mapStateToProps, mapDispatchToProps)
export default connectSettings(VehicleLoader)
