import React, { PropTypes } from 'react'

import Input from './input'

const PasswordInput = (props) => {
  return <Input type="password" {...props} />
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
}

export default PasswordInput
