import React from 'react'

const VehicleButton = () => {
  return (
    <a href="#" className="vehicle btn btn-default" tabIndex="0">
      <p>
        <span className="year-make-model">
          2012
          Toyota
          Camry
        </span>
        <span className="color">Cyan</span>
      </p>
      <span className="mileage">202,142 miles</span>
    </a>
  )
}

VehicleButton.propTypes = {
  vehicle: React.PropTypes.object.isRequired,
}

export default VehicleButton
