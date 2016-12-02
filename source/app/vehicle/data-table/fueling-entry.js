import React, { PropTypes } from 'react'
import moment from 'moment'
import numeral from 'numeral'

const FuelingEntry = ({ fueling }) => {
  return (
    <div className="entry row">
      <div className="col-sm-3">
        {
          fueling.aboveAverageMPG()
            ? <i className="fa modifier fa-caret-up increase"></i>
            : <i className="fa modifier fa-caret-down decrease"></i>
        }
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
        <button className="btn btn-link">
          <i className="fa fa-pencil"></i>
        </button>
        <button className="btn btn-link">
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
  })
}

export default FuelingEntry
