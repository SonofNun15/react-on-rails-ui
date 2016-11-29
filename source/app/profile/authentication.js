import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

// With inspiration from Josh Geller (https://github.com/joshgeller/react-redux-jwt-auth-example)
export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props)
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps)
    }

    checkAuth(props) {
      if (!props.authCheckPending && !props.loggedIn) {
        props.dispatch(push(`/`))
      }
    }

    render() {
      return (
        <div>
          {
            this.props.authCheckPending
              ? <span>LOADING, please wait...</span>
              : null
          }
          {
            this.props.loggedIn
              ? <Component {...this.props} />
              : null
          }
        </div>
      )

    }
  }

  AuthenticatedComponent.propTypes = {
    loggedIn: React.PropTypes.bool,
    authCheckPending: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
  }

  const mapStateToProps = (state) => ({
    loggedIn: state.profile.loggedIn,
    authCheckPending: state.profile.authCheckPending,
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}
