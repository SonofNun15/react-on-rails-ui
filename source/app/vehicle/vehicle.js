import React, { PropTypes } from 'react'

import VehicleTitle from './title'
import MPGSummary from './mpg-summary'
import MileageSummary from './mileage-summary'
import VehicleDataTable from './data-table/data-table'

const VehicleDetails = ({ vehicle, onEdit, onDelete }) => {
  return (
    <div className="vehicle">
      <VehicleTitle vehicle={vehicle} onEdit={onEdit} onDelete={onDelete} />
      <div className="summaries row">
        <div className="col-sm-6">
          <MPGSummary vehicle={vehicle} />
        </div>
        <div className="col-sm-6">
          <MileageSummary vehicle={vehicle} />
        </div>
      </div>
      <VehicleDataTable fuelings={vehicle.fuelings}
                        maintenance={vehicle.maintenance} />
    </div>
  )
}

VehicleDetails.propTypes = {
  vehicle: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

export default VehicleDetails
