import React, { PropTypes } from 'react'

import Input from './input'

const NumberInput = (props) => {
  return <Input type="number" {...props} />
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
}

export default NumberInput
