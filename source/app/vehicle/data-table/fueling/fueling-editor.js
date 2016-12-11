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

    if (props.fueling) {
      this.state = {
        ...props.fueling,
        date: moment(props.fueling.date).format('YYYY-MM-DD'),
      }
    } else {
      const today = moment().format('YYYY-MM-DD')
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
    if (isNaN(this.state.gas)) {
      return 'Gas must be a number'
    } else {
      const date = moment(this.state.date)
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
        <form className="editor form-inline" onSubmit={this.save}>
          <div className="editor-controls">
            <TextInput name="gas" placeholder="Gas" step={0.1}
                        value={gas} onChange={this.onChange} />
            <NumberInput name="miles" placeholder="Miles"
                        value={miles} onChange={this.onChangeNumber} />
            <NumberInput name="cost" placeholder="Cost"
                        value={cost} onChange={this.onChangeNumber} />
            <DateInput name="date" placeholder="Date"
                      value={date} onChange={this.onChange} />
          </div>
          <div className="editor-buttons">
            <button type="button" className="btn btn-danger" onClick={onClose}>
              <i className="fa fa-times"></i> Cancel
            </button>
            <button type="submit" className="btn btn-success">
              <i className="fa fa-plus"></i> Save
            </button>
          </div>
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
