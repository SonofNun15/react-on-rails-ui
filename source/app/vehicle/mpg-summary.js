import React, { PropTypes } from 'react'
import numeral from 'numeral'

const MPGSummary = ({ vehicle }) => {
  return (
    <div className="mileage-summary">
      <h3>MPG</h3>
      <div className="entries row">
        <span className="lifetime col-xs-6">
          <span className="entry-label">Lifetime: </span>
          <span className="value">
            {numeral(vehicle.lifetimeMPG()).format('0.[00]')} MPG
          </span>
        </span>
        <span className="6mo col-xs-6">
          <span className="entry-label">6 months: </span>
          <span className="value">
            {numeral(vehicle.recentMPG()).format('0.[00]')} MPG
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
