import React, { PropTypes } from 'react'
import _ from 'lodash'

import DataEntry from './data-entry'
import DataList from './data-list'

const VehicleDataTable = ({ fuelings, maintenance }) => {
  const lineItems = _(fuelings.concat(maintenance)).orderBy(item => item.date).value()
  return (
    <div>
      <DataEntry />
      <DataList lineItems={lineItems} />
    </div>
  )
}

VehicleDataTable.propTypes = {
  fuelings: PropTypes.array.isRequired,
  maintenance: PropTypes.array.isRequired,
}

export default VehicleDataTable
