import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as listActions from '../vehicle-list/actions'
//import * as actionCreators from './actions'
import VehicleDetails from './vehicle'

class VehicleContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

  }

  render() {
    const { vehicle } = this.props
    if (vehicle)
      return <VehicleDetails vehicle={vehicle} />

    else
      return <span>LOADING, please wait...</span>
  }
}

VehicleContainer.propTypes = {
  stale: PropTypes.bool,
  vehicle: PropTypes.object,
  id: PropTypes.number,
  actions: PropTypes.object,
  listActions: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  let { params: { id } } = ownProps
  id = parseInt(id)
  const vehicle = state.vehicleList.vehicles.find(v => v.id == id)

  return {
    stale: state.vehicleList.stale,
    vehicle,
    id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listActions: bindActionCreators(listActions, dispatch),
  }
}

const connectSettings = connect(mapStateToProps, mapDispatchToProps)
export default connectSettings(VehicleContainer)
