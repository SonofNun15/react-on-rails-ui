import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './actions'
import { showError } from '../messages/actions'
import Profile from './profile'
import Register from './register'
import PasswordDialog from './dialog'

class UserEditorContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.createUser = this.createUser.bind(this)
    this.saveUser = this.saveUser.bind(this)
    this.showPasswordEditDialog = this.showPasswordEditDialog.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.closePasswordEditDialog = this.closePasswordEditDialog.bind(this)
    this.showError = this.showError.bind(this)
  }

  createUser(newUser) {
    this.props.actions.createUser(newUser)
  }

  saveUser(user) {
    this.props.actions.saveUser(user)
  }

  showPasswordEditDialog() {
    this.props.actions.showPasswordEditDialog()
  }

  changePassword(newPassword) {
    this.props.actions.changePassword(newPassword)
  }

  closePasswordEditDialog() {
    this.props.actions.closePasswordEditDialog()
  }

  showError(error) {
    this.props.showError(error)
  }

  render() {
    const { newUser, profile, displayPasswordDialog } = this.props

    if (newUser) {
      return <Register onCreate={this.createUser} onError={this.showError} />
    } else {
      return (
        <div>
          <Profile profile={profile} onSave={this.saveUser}
                   onChangePassword={this.showPasswordEditDialog} />
          <PasswordDialog show={displayPasswordDialog} onCancel={this.closePasswordEditDialog}
                          onSave={this.changePassword} />
        </div>
      )
    }
  }
}

UserEditorContainer.propTypes = {
  newUser: PropTypes.bool,
  profile: PropTypes.object,
  displayPasswordDialog: PropTypes.bool,
  actions: PropTypes.object,
  showError: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const newUser = ownProps.route.path == 'register'

  return {
    newUser,
    profile: state.profile.settings,
    displayPasswordDialog: state.userEditor.showPasswordDialog,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  showError: error => dispatch(showError(error)),
})

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectedComponent(UserEditorContainer)
