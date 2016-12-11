import React, { PropTypes } from 'react'
import moment from 'moment'

import TextInput from '../../../forms/text-input'
import NumberInput from '../../../forms/number-input'
import DateInput from '../../../forms/date-input'

class MaintenanceEditor extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.onChangeNumber = this.onChangeNumber.bind(this)
    this.save = this.save.bind(this)

    const today = moment().format('YYYY-MM-DD')

    if (props.maintenance) {
      this.state = { ...props.maintenance }
    } else {
      this.state = {
        mechanic: '',
        description: '',
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
    event.preventDefault()
    const { onSave } = this.props
    onSave({
      ...this.state,
      date: moment(this.state.date),
    })
  }

  render() {
    const { onClose } = this.props
    const { mechanic, description, cost, date } = this.state
    return (
      <div>
        <form className="editor form-inline" onSubmit={this.save}>
          <div className="editor-controls">
            <TextInput name="mechanic" placeholder="Mechanic"
                      value={mechanic} onChange={this.onChange} />
            <TextInput name="description" placeholder="Description"
                      value={description} onChange={this.onChange} />
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
          <div className="clearfix"></div>
        </form>
      </div>
    )
  }
}

MaintenanceEditor.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  maintenance: PropTypes.object,
}

export default MaintenanceEditor
