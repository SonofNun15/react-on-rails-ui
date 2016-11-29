import React, { PropTypes } from 'react'

import TextInput from '../forms/text-input'
import PasswordInput from '../forms/password-input'

const LoginForm = ({ email, password, onChange }) => {
  return (
    <div>
      <TextInput name="email" label="Email"
                 value={email} onChange={onChange} />
      <PasswordInput name="password" label="Password"
                 value={password} onChange={onChange} />
    </div>
  )
}

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onChange: PropTypes.func,
}

export default LoginForm
