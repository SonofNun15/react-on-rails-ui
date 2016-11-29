import React, { PropTypes } from 'react'

import Input from './input'

const TextInput = (props) => {
  return <Input type="text" {...props} />
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
}

export default TextInput
