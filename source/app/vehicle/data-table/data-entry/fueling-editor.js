import React, { PropTypes } from 'react'
import moment from 'moment'

import NumberInput from '../../../forms/number-input'
import DateInput from '../../../forms/date-input'

class FuelingEditor extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.onChangeNumber = this.onChangeNumber.bind(this)
    this.create = this.create.bind(this)

    const today = moment().format('YYYY-MM-DD')
    this.state = {
      gas: '',
      miles: '',
      cost: '',
      date: today,
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

  create(event) {
    event.preventDefault()
    const { onCreate } = this.props
    onCreate({
      ...this.state,
      date: moment(this.state.date),
    })
  }

  render() {
    const { onClose } = this.props
    const { gas, miles, cost, date } = this.state
    return (
      <div>
        <form className="form-inline" onSubmit={this.create}>
          <NumberInput name="gas" placeholder="Gas"
                       value={gas} onChange={this.onChangeNumber} />
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
  onCreate: PropTypes.func,
  onClose: PropTypes.func,
}

export default FuelingEditor
