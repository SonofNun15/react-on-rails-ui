import React, { PropTypes } from 'react'

const MileageSummary = ({ vehicle }) => {
  return (
    <div className="mileage-summary">
      <h3>Mileage</h3>
      <div className="entries row">
        <span className="lifetime col-xs-6">
          <span className="entry-label">Lifetime: </span>
          <span className="value">
            {vehicle.lifetimeMileage()} miles
          </span>
        </span>
        <span className="6mo col-xs-6">
          <span className="entry-label">6 months: </span>
          <span className="value">
            {vehicle.recentMileage()} miles
          </span>
        </span>
        <span className="maintenance-miles col-xs-12">
          <span className="entry-label">Since maintenance: </span>
          <span className="value">
            {vehicle.mileageSinceMaintenance()} miles
          </span>
        </span>
      </div>
    </div>
  )
}

MileageSummary.propTypes = {
  vehicle: PropTypes.shape({
    lifetimeMileage: PropTypes.func,
    recentMileage: PropTypes.func,
    mileageSinceMaintenance: PropTypes.func,
  }).isRequired,
}

export default MileageSummary
