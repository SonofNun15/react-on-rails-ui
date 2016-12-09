import React, { PropTypes } from 'react'
import moment from 'moment'

import TextInput from '../../../forms/text-input'
import NumberInput from '../../../forms/number-input'
import DateInput from '../../../forms/date-input'

class FuelingEditor extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.onChangeNumber = this.onChangeNumber.bind(this)
    this.save = this.save.bind(this)

    const today = moment().format('YYYY-MM-DD')

    if (props.fueling) {
      this.state = { ...props.fueling }
    } else {
      this.state = {
        gas: '',
        miles: '',
        cost: '',
        date: today,
      }
    }
  }

  onChange(event) {
    const field = event.target.name
    this.setState({
      ...this.state,
      [field]: event.target.value,
    })
  }

  onChangeNumber(event) {
    const field = event.target.name
    this.setState({
      ...this.state,
      [field]: parseInt(event.target.value),
    })
  }

  save(event) {
    const { onSave, onError } = this.props
    event.preventDefault()

    if (!this.valid()) {
      onError(this.error())
    } else {
      onSave({
        ...this.state,
        date: moment(this.state.date),
      })
    }
  }

  valid() {
    return this.error() == null
  }

  error() {
    if (isNaN(gas)) {
      return 'Gas must be a number'
    } else {
      const date = moment(this.date)
      if (!date.isValid()) {
        return 'Date must be a valid date'
      }
    }
  }

  render() {
    const { onClose } = this.props
    const { gas, miles, cost, date } = this.state
    return (
      <div>
        <form className="form-inline" onSubmit={this.save}>
          <TextInput name="gas" placeholder="Gas" step={0.1}
                       value={gas} onChange={this.onChange} />
          <NumberInput name="miles" placeholder="Miles"
                       value={miles} onChange={this.onChangeNumber} />
          <NumberInput name="cost" placeholder="Cost"
                       value={cost} onChange={this.onChangeNumber} />
          <DateInput name="date" placeholder="Date"
                     value={date} onChange={this.onChange} />
          <div className="pull-right buttons">
            <button type="button" className="btn btn-danger" onClick={onClose}>
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
}

FuelingEditor.propTypes = {
  fueling: PropTypes.shape({
    gas: PropTypes.number,
    miles: PropTypes.number,
    cost: PropTypes.number,
    date: PropTypes.any,
  }),
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  onError: PropTypes.func,
}

export default FuelingEditor
