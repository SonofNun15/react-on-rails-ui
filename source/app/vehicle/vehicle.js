import React from 'react'

import VehicleTitle from './title'
import MPGSummary from './mpg-summary'
import MileageSummary from './mileage-summary'
import VehicleDataTable from './data-table'

class Vehicle extends React.Component {
  render() {
    return (
      <div className="vehicle">
        <VehicleTitle />
        <div className="summaries row">
          <div className="col-sm-6">
            <MPGSummary />
          </div>
          <div className="col-sm-6">
            <MileageSummary />
          </div>
        </div>
        <VehicleDataTable />
      </div>
    )
  }
}

Vehicle.propTypes = {
}

export default Vehicle
