import React from 'react'

const DataEntry = () => {
  return (
    <div className="buttons">
      <button type="button" className="btn btn-default">
        <i className="fa fa-tachometer"></i> Add fueling
      </button>
      <button type="button" className="btn btn-default">
        <i className="fa fa-wrench"></i> Add maintenance
      </button>
    </div>
  )
}

export default DataEntry
