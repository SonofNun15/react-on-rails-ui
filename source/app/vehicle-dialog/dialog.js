import React, { PropTypes } from 'react'

import { Modal } from 'react-bootstrap'
import { TextInput, NumberInput } from '../forms/controls'

class VehicleDialog extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.onChangeMileage = this.onChangeMileage.bind(this)
    this.create = this.create.bind(this)

    this.state = {
      year: '',
      make: '',
      model: '',
      color: '',
      mileage: 0,
    }
  }

  onChange(event) {
    const field = event.target.name
    this.setState({
      ...this.state,
      [field]: event.target.value,
    })
  }

  onChangeMileage(event) {
    this.setState({
      ...this.state,
      mileage: parseInt(event.target.value),
    })
  }

  create(event) {
    event.preventDefault()
    const { onCreate } = this.props
    onCreate(this.state)
  }

  render() {
    const { show, onClose } = this.props
    const { year, make, model, color, mileage } = this.state
    return (
      <Modal show={show} onHide={onClose}>
        <form onSubmit={this.create}>
          <Modal.Header>
            <Modal.Title>Create Vehicle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextInput name="year" label="Year"
                      value={year} onChange={this.onChange} />
            <TextInput name="make" label="Make"
                      value={make} onChange={this.onChange} />
            <TextInput name="model" label="Model"
                      value={model} onChange={this.onChange} />
            <TextInput name="color" label="Color"
                      value={color} onChange={this.onChange} />
            <NumberInput name="mileage" label="Mileage"
                        value={mileage} onChange={this.onChangeMileage} />
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-default" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

VehicleDialog.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
}

export default VehicleDialog
