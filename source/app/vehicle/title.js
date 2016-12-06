import React, { PropTypes } from 'react'

const VehicleTitle = ({ vehicle, onEdit, onDelete }) => {
  const { year, make, model } = vehicle
  const maintenance = <div className="important maintenance">
                        <i className="fa fa-exclamation-circle"></i>
                        <span> Maintenance required!</span>
                      </div>

  return (
    <div>
      <div className="title">
        <h2>
          <span>{year} </span>
          <span>{make} </span>
          <span>{model} </span>
        </h2>
        <div className="buttons">
          <button className="btn btn-default" onClick={onEdit}>
            <i className="fa fa-edit"></i>
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      { vehicle.requiresMaintenance() ? maintenance : null }
    </div>
  )
}

VehicleTitle.propTypes = {
  vehicle: PropTypes.shape({
    year: PropTypes.strig,
    make: PropTypes.string,
    model: PropTypes.string,
    requiresMaintenance: PropTypes.func,
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

export default VehicleTitle
