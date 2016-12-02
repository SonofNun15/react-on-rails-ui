import React, { PropTypes } from 'react'
import moment from 'moment'

const MaintenanceEntry = ({ maintenance }) => {
  const indicator = <i className="fa fa-exclamation-circle important"></i>

  return (
    <div className="entry row">
      <div className="col-sm-3">
        { maintenance.needsAttention() ? indicator : null }
        <i className="fa fa-wrench"></i>
        <span>{maintenance.mechanic}</span>
      </div>
      <div className="detail col-sm-4">
        <span>{maintenance.description}</span>
      </div>
      <div className="date col-sm-3">
        <span>{moment(maintenance.date).format('MMM D, YYYY')}</span>
      </div>
      <div className="action col-sm-2">
        <button className="btn btn-link">
          <i className="fa fa-pencil"></i>
        </button>
        <button className="btn btn-link">
          <i className="fa fa-times"></i>
        </button>
      </div>
    </div>
  )
}

MaintenanceEntry.propTypes = {
  maintenance: PropTypes.shape({
    needsAttention: PropTypes.func,
    mechanic: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.any,
  }),
}

export default MaintenanceEntry
