import React, { PropTypes } from 'react'

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
      <span className="mileage">{vehicle.lifetimeMileage()} miles</span>
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
