import React, { PropTypes } from 'react'
import numeral from 'numeral'

import { Link } from 'react-router'

const VehicleButton = ({ vehicle }) => {
  const { id, year, make, model, color } = vehicle
  return (
    <Link to={`/vehicles/${id}`} className="vehicle btn btn-default" tabIndex="0">
      <p>
        <span className="year-make-model">
          {`${year} `}
          {`${make} `}
          {model}
        </span>
        <span className="color">{color}</span>
      </p>
      <span className="mileage">
        {numeral(vehicle.lifetimeMileage()).format('0,0')} miles
      </span>
    </Link>
  )
}

VehicleButton.propTypes = {
  vehicle: PropTypes.shape({
    year: PropTypes.string,
    make: PropTypes.string,
    model: PropTypes.string,
    color: PropTypes.string,
    lifetimeMileage: PropTypes.func,
  }).isRequired,
}

export default VehicleButton
