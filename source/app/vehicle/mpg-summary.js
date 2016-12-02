import React, { PropTypes } from 'react'

const MPGSummary = ({ vehicle }) => {
  return (
    <div className="mileage-summary">
      <h3>MPG</h3>
      <div className="entries row">
        <span className="lifetime col-xs-6">
          <span className="entry-label">Lifetime: </span>
          <span className="value">
            {vehicle.lifetimeMPG()} MPG
          </span>
        </span>
        <span className="6mo col-xs-6">
          <span className="entry-label">6 months: </span>
          <span className="value">
            {vehicle.recentMPG()} MPG
          </span>
        </span>
      </div>
    </div>
  )
}

MPGSummary.propTypes = {
  vehicle: PropTypes.shape({
    lifetimeMPG: PropTypes.func,
    recentMPG: PropTypes.func,
  }).isRequired,
}

export default MPGSummary
