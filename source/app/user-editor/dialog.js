import React, { Component, PropTypes } from 'react'

import { Modal } from 'react-bootstrap'
import { PasswordInput } from '../forms/controls'

class PasswordDialog extends Component {
  constructor(props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.save = this.save.bind(this)

    this.state = {
      password: '',
      passwordConfirmation: '',
      error: null,
    }
  }

  onChange(event) {
    const field = event.target.name
    this.setState({
      ...this.state,
      [field]: event.target.value,
    })
  }

  save(event) {
    event.preventDefault()
    const { onSave } = this.props
    const { password, passwordConfirmation } = this.state

    if (password == passwordConfirmation) {
      onSave(this.state)
    } else {
      this.setState({
        ...this.state,
        error: 'Password and confirmation do not match!',
      })
    }
  }

  displayError() {
    const { error } = this.state
    if (error) {
      return <div className="alert alert-danger">{error}</div>
    }
  }

  render() {
    const { show, onCancel } = this.props
    const { password, passwordConfirmation } = this.state
    return (
      <Modal show={show} onHide={onCancel}>
        <form onSubmit={this.save}>
          <Modal.Header>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.displayError()}
            <PasswordInput name="password" label="Password"
                           value={password} onChange={this.onChange} />
            <PasswordInput name="passwordConfirmation" label="Confirm Password"
                           value={passwordConfirmation} onChange={this.onChange} />
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-default" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

PasswordDialog.propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
}

export default PasswordDialog
