import React, { PropTypes } from 'react'

import Input from './input'

const DateInput = (props) => {
  return <Input type="date" {...props} />
}

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
}

export default DateInput
