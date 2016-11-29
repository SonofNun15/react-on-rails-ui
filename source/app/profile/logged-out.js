import React, { PropTypes } from 'react'

import { Link } from 'react-router'
import { Modal } from 'react-bootstrap'

import LoginForm from './login-form'

class LoggedOut extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.login = this.login.bind(this)
    this.updateState = this.updateState.bind(this)

    this.state = {
      email: '',
      password: '',
    }
  }

  updateState(event) {
    const field = event.target.name
    this.setState({
      [field]: event.target.value,
    })
  }

  login(e) {
    const { email, password } = this.state
    this.props.onLogin(email, password)
    e.preventDefault()
  }

  render() {
    const {
      openLoginDialog,
      closeLoginDialog,
      showLoginDialog,
    } = this.props
    const { email, password } = this.state
    return (
      <div>
        <button onClick={openLoginDialog} className="btn btn-default">
          Login
        </button>
        <Modal show={showLoginDialog} onHide={closeLoginDialog}>
          <form onSubmit={this.login}>
            <Modal.Header>
              <Modal.Title>Log in</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <LoginForm email={email} password={password}
                         onChange={this.updateState} />
            </Modal.Body>

            <Modal.Footer>
              <button type="button" className="btn btn-default" onClick={closeLoginDialog}>
                Close
              </button>
              <Link to="/register" className="btn btn-default" onClick={closeLoginDialog}>
                Register
              </Link>
              <button type="sumit" className="btn btn-primary">
                Login
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    )
  }
}

LoggedOut.propTypes = {
  showLoginDialog: PropTypes.bool,
  openLoginDialog: PropTypes.func,
  closeLoginDialog: PropTypes.func,
  onLogin: PropTypes.func,
}

export default LoggedOut
