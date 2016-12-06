import React from 'react'

import FuelingEditor from './fueling-editor'
import MaintenanceEditor from './maintenance-editor'

const DataEntry = () => {
  const editor = <div><FuelingEditor /><MaintenanceEditor /></div>
  return (
    <div>
      <div className="buttons">
        <button type="button" className="btn btn-default">
          <i className="fa fa-tachometer"></i> Add fueling
        </button>
        <button type="button" className="btn btn-default">
          <i className="fa fa-wrench"></i> Add maintenance
        </button>
      </div>
      { editor }
    </div>
  )
}

export default DataEntry
