import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './actions'
import { showError } from '../messages/actions'
import Profile from './profile'
import Register from './register'

class UserEditorContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.createUser = this.createUser.bind(this)
    this.saveUser = this.saveUser.bind(this)
    this.showError = this.showError.bind(this)
  }

  createUser(newUser) {
    this.props.actions.createUser(newUser)
  }

  saveUser(user) {
    this.props.actions.saveUser(user)
  }

  showError(error) {
    this.props.showError(error)
  }

  render() {
    const { newUser, profile } = this.props

    if (newUser) {
      return <Register onCreate={this.createUser} onError={this.showError} />
    } else {
      return <Profile profile={profile} onSave={this.saveUser} />
    }
  }
}

UserEditorContainer.propTypes = {
  newUser: PropTypes.bool,
  profile: PropTypes.object,
  actions: PropTypes.object,
  showError: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const newUser = ownProps.route.path == 'register'

  return {
    newUser,
    profile: state.profile.settings,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  showError: error => dispatch(showError(error)),
})

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectedComponent(UserEditorContainer)
