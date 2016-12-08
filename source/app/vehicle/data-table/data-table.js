import React, { PropTypes } from 'react'
import _ from 'lodash'

import DataEntryContainer from './data-entry/container'
import DataList from './data-list'

const VehicleDataTable = ({ vehicleId, fuelings, maintenance }) => {
  const lineItems = _(fuelings.concat(maintenance)).orderBy(item => item.date, 'desc').value()
  return (
    <div>
      <DataEntryContainer vehicleId={vehicleId} />
      <DataList lineItems={lineItems} />
    </div>
  )
}

VehicleDataTable.propTypes = {
  vehicleId: PropTypes.number,
  fuelings: PropTypes.array.isRequired,
  maintenance: PropTypes.array.isRequired,
}

export default VehicleDataTable
