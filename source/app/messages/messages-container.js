import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './actions'
import Messages from './messages'

class MessagesContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.dismiss = this.dismiss.bind(this)
  }

  dismiss(messageId) {
    this.props.actions.dismissMessage(messageId)
  }

  render() {
    const { messages } = this.props
    return <Messages messages={messages} onDismiss={this.dismiss} />
  }
}

MessagesContainer.propTypes = {
  messages: PropTypes.array,
  actions: PropTypes.object,
}

const mapStateToProps = (state) => ({
  messages: state.messages,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const connectSettings = connect(mapStateToProps, mapDispatchToProps)
export default connectSettings(MessagesContainer)
