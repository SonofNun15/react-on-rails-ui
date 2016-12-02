import React, { PropTypes } from 'react'

import Fueling from '../../models/fueling'
import Maintenance from '../../models/maintenance'
import FuelingEntry from './fueling-entry'
import MaintenanceEntry from './maintenance-entry'

const LineItem = ({ item }) => {
  if (item instanceof Fueling) {
    return <FuelingEntry fueling={item} />
  } else if (item instanceof Maintenance) {
    return <MaintenanceEntry maintenance={item} />
  }
}

LineItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default LineItem
