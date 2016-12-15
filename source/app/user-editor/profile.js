import React, { Component, PropTypes } from 'react'

import TextInput from '../forms/text-input'

class Profile extends Component {
  constructor(props, context) {
    super(props, context)

    this.onChange = this.onChange.bind(this)
    this.save = this.save.bind(this)

    this.state = this.props.profile
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
    onSave(this.state)
  }

  render() {
    const { name, email } = this.state
    return (
      <div className="profile form">
        <form onSubmit={this.save}>
          <TextInput name="name" label="Name"
                     value={name} onChange={this.onChange} />
          <TextInput name="email" label="Email"
                     value={email} onChange={this.onChange} />
          <div className="form-group">
            <button type="submit" className="btn btn-success">Save</button>
            <button type="button" className="btn btn-default">Change password</button>
          </div>
        </form>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onSave: PropTypes.func,
}

export default Profile
