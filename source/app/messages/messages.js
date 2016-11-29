import React, { PropTypes } from 'react'

import Message from './message'

const Messages = ({ messages, onDismiss }) => {
  return (
    <div className="messages">
      {messages.map((message, id) => {
        return <Message key={id} message={message}
                        onDismiss={() => onDismiss(id)} />
      })}
    </div>
  )
}

Messages.propTypes = {
  messages: PropTypes.array,
  onDismiss: PropTypes.func,
}

export default Messages
