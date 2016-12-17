import React, { PropTypes } from 'react'
import moment from 'moment'
import numeral from 'numeral'

const FuelingEntry = ({ fueling, onEdit, onDelete }) => {
  let indicator = null
  if (fueling.aboveAverageMPG()) {
    indicator = <i className="fa modifier fa-caret-up increase"></i>
  } else if (fueling.belowAverageMPG()) {
    indicator = <i className="fa modifier fa-caret-down decrease"></i>
  }

  return (
    <div className="row">
      <div className="col-sm-3">
        {indicator}
        <i className="fa fa-fw fa-tachometer"></i>
        <span> {numeral(fueling.mpg()).format('0.[00]')} MPG</span>
      </div>
      <div className="detail col-sm-4">
        <span>{fueling.miles} miles</span>
      </div>
      <div className="date col-sm-3">
        <span>{moment(fueling.date).format('MMM D, YYYY')}</span>
      </div>
      <div className="action col-sm-2">
        <button className="btn btn-default" onClick={onEdit}>
          <i className="fa fa-pencil"></i>
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          <i className="fa fa-times"></i>
        </button>
      </div>
    </div>
  )
}

FuelingEntry.propTypes = {
  fueling: PropTypes.shape({
    aboveAverageMPG: PropTypes.func,
    mpg: PropTypes.func,
    miles: PropTypes.number,
    date: PropTypes.any,
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

export default FuelingEntry
