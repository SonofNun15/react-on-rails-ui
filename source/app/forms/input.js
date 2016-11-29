import React, { PropTypes } from 'react'

const Input = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  error
}) => {
  return (
    <div className="form-group">
      { label && <label htmlFor={name} className="control-label">{label}: </label> }
      <div className="field">
        <input type={type} className="form-control"
               placeholder={placeholder} name={name} id={name}
               value={value} onChange={onChange} />
        { error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
}

export default Input
