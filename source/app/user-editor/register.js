import React, { PropTypes } from 'react'

import TextInput from '../forms/text-input'
import PasswordInput from '../forms/password-input'

class Register extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.submit = this.submit.bind(this)

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  }

  onChange(event) {
    const field = event.target.name
    this.setState({
      ...this.state,
      [field]: event.target.value,
    })
  }

  submit(event) {
    event.preventDefault()
    const { onCreate, onError } = this.props
    const { password, passwordConfirmation } = this.state

    if (password != passwordConfirmation) {
      onError('Password and password confirmation do not match!')
    } else {
      onCreate(this.state)
    }
  }

  render() {
    const { name, email, password, passwordConfirmation } = this.state
    return (
      <div className="register form">
        <form onSubmit={this.submit}>
          <TextInput name="name" label="Name"
                     value={name} onChange={this.onChange} />
          <TextInput name="email" label="Email"
                     value={email} onChange={this.onChange} />
          <PasswordInput name="password" label="Password"
                         value={password} onChange={this.onChange} />
          <PasswordInput name="passwordConfirmation" label="Confirm Password"
                         value={passwordConfirmation} onChange={this.onChange} />
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </div>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  onCreate: PropTypes.func,
  onError: PropTypes.func,
}

export default Register
