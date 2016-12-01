import React, { PropTypes } from 'react'

import { Link } from 'react-router'

const VehicleButton = ({ vehicle: { id, year, make,
                                    model, color, mileage } }) => {
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
      <span className="mileage">{mileage} miles</span>
    </Link>
  )
}

VehicleButton.propTypes = {
  vehicle: PropTypes.shape({
    year: PropTypes.string,
    make: PropTypes.string,
    model: PropTypes.string,
    color: PropTypes.string,
    mileage: PropTypes.number,
  }).isRequired,
}

export default VehicleButton
