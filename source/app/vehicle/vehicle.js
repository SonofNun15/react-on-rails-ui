import React from 'react'

class Vehicle extends React.Component {
  render() {
    return (
      <div>
        <h2>Vehicle title</h2>
        {this.props.children}
      </div>
    )
  }
}

Vehicle.propTypes = {
  children: React.PropTypes.array.isRequired,
}

export default Vehicle
