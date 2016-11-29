import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from './actions'
import LoggedIn from './logged-in'
import LoggedOut from './logged-out'

class ProfileContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.openLoginDialog = this.openLoginDialog.bind(this)
    this.closeLoginDialog = this.closeLoginDialog.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  openLoginDialog() {
    this.props.actions.openLogin()
  }

  closeLoginDialog() {
    this.props.actions.closeLogin()
  }

  login(email, password) {
    this.props.actions.login(email, password)
  }

  logout() {
    this.props.actions.logout()
  }

  render() {
    const {
      authCheckPending,
      loggingOut,
      loggedIn,
      settings,
      showLoginDialog
    } = this.props

    if (authCheckPending || loggingOut)
      return <i className="fa fa-spin fa-spinner"></i>

    else if (loggedIn)
      return <LoggedIn profile={settings} onLogout={this.logout} />

    else
      return <LoggedOut openLoginDialog={this.openLoginDialog}
                        showLoginDialog={showLoginDialog}
                        closeLoginDialog={this.closeLoginDialog}
                        onLogin={this.login} />
  }
}

ProfileContainer.propTypes = {
  settings: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    gravatarHash: PropTypes.string,
  }),
  authCheckPending: PropTypes.bool,
  loggingOut: PropTypes.bool,
  loggedIn: PropTypes.bool,
  showLoginDialog: PropTypes.bool,
  actions: PropTypes.object,
}

const mapStateToProps = (state) => ({
  settings: state.profile.settings,
  authCheckPending: state.profile.authCheckPending,
  loggingOut: state.profile.loggingOut,
  loggedIn: state.profile.loggedIn,
  showLoginDialog: state.profile.showLoginDialog,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
})

const connectSettings = connect(mapStateToProps, mapDispatchToProps)
export default connectSettings(ProfileContainer)
