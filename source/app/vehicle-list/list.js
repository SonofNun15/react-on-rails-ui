import React from 'react'

import VehicleButton from './button'

const VehicleList = (props) => {
  const { vehicles } = props

  return (
    <div>
      <h2>Vehicles</h2>
      <div className="vehicles">
        {vehicles.map(vehicle => makeButton(vehicle))}
      </div>
    </div>
  )
}

function makeButton(vehicle) {
  return <VehicleButton key={vehicle.id} vehicle={vehicle} />
}

VehicleList.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
}

export default VehicleList
