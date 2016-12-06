import React, { PropTypes } from 'react'

import NumberInput from '../../forms/number-input'
import DateInput from '../../forms/date-input'

const FuelingEditor = () => {
  return (
    <div>
      <form className="form-inline">
        <NumberInput name="gas" placeholder="Gas" />
        <NumberInput name="miles" placeholder="Miles" />
        <NumberInput name="cost" placeholder="Cost" />
        <DateInput name="date" placeholder="Date" />
        <div className="pull-right buttons">
          <button type="button" className="btn btn-danger">
            <i className="fa fa-times"></i> Close
          </button>
          <button type="submit" className="btn btn-success">
            <i className="fa fa-plus"></i> Add
          </button>
        </div>
        <div className="clearfix"></div>
      </form>
    </div>
  )
}

export default FuelingEditor
