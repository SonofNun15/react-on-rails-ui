import React, { PropTypes } from 'react'

import Fueling from '../../models/fueling'
import Maintenance from '../../models/maintenance'
import FuelingContainer from './fueling/container'
import MaintenanceContainer from './maintenance/container'

const LineItem = ({ vehicleId, item }) => {
  if (item instanceof Fueling) {
    return <FuelingContainer vehicleId={vehicleId} fueling={item} />
  } else if (item instanceof Maintenance) {
    return <MaintenanceContainer vehicleId={vehicleId} maintenance={item} />
  }
}

LineItem.propTypes = {
  vehicleId: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
}

export default LineItem
