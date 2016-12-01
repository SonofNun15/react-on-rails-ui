import React from 'react'

import { Link } from 'react-router'
import ProfileContainer from '../profile/profile-container'

const Header = () => {
  return (
    <header>
      <Link to="/" className="title">
        <i className="fa fa-car"></i>
        <span>Mileage</span>
      </Link>
      <ProfileContainer />
    </header>
  )
}

export default Header
