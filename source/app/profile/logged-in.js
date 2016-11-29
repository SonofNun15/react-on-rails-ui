import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const LoggedIn = (props) => {
  const { onLogout, profile: { name, gravatarHash } } = props
  return (
    <div className="dropdown">
      <div className="profile" data-toggle="dropdown" tabIndex="0">
        <span>{name}</span>
        <div className="pic">
          <img src={'https://www.gravatar.com/avatar/' + gravatarHash + '?s=96&d=identicon'}
                width="48" height="48" />
        </div>
        <i className="fa fa-caret-down"></i>
      </div>
      <ul className="dropdown-menu dropdown-menu-right">
        <li>
          <Link to="/profile">
            <i className="fa fa-user"></i> Profile
          </Link>
        </li>
        <li role="separator" className="divider"></li>
        <li>
          <button type="button" onClick={onLogout}>
            <i className="fa fa-sign-out"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

LoggedIn.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    gravatarHash: PropTypes.string,
  }),
  onLogout: PropTypes.func,
}

export default LoggedIn
