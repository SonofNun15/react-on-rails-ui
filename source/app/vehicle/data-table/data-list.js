import React, { PropTypes } from 'react'
import _ from 'lodash'

import LineItem from './line-item'

function createLineItem(vehicleId, item) {
  return <LineItem key={item.constructor.name + item.id}
                   vehicleId={vehicleId}
                   item={item} />
}
const DataList = ({ vehicleId, lineItems }) => {
  return (
    <div className="data-table">
      {_.map(lineItems, item => createLineItem(vehicleId, item))}
    </div>
  )
}

DataList.propTypes = {
  vehicleId: PropTypes.number.isRequired,
  lineItems: PropTypes.array.isRequired,
}

export default DataList
