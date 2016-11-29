import React from 'react'

import ProfileContainer from '../profile/profile-container'

const Header = () => {
  return (
    <header>
      <a href="/" className="title">
        <i className="fa fa-car"></i>
        <span>Mileage</span>
      </a>
      <ProfileContainer />
    </header>
  )
}

export default Header
