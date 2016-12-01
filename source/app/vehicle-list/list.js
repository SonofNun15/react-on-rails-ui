import React, { PropTypes } from 'react'

import VehicleButton from './button'

const VehicleList = (props) => {
  const { loading, vehicles, onAddVehicle } = props

  return (
    <div>
      <h2>Vehicles</h2>
      { loading
          ? <i className="fa fa-spin fa-spinner fa-2x"></i>
          : <div className="vehicles">
              {vehicles.map(vehicle => makeButton(vehicle))}
              <button type="button" className="vehicle btn btn-default"
                      onClick={onAddVehicle}>
                <span>
                  <i className="fa fa-plus"></i> Add vehicle
                </span>
              </button>
            </div>
      }
    </div>
  )
}

function makeButton(vehicle) {
  return <VehicleButton key={vehicle.id} vehicle={vehicle} />
}

VehicleList.propTypes = {
  vehicles: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onAddVehicle: PropTypes.func,
}

export default VehicleList
