import React, { PropTypes } from 'react'
import _ from 'lodash'

import LineItem from './line-item'

const DataList = ({ lineItems }) => {
  return (
    <div className="data-table">
      {_.map(lineItems, item => <LineItem key={item.constructor.name + item.id} item={item} />)}
    </div>
  )
}

DataList.propTypes = {
  lineItems: PropTypes.array.isRequired,
}

export default DataList
