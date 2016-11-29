import React, { PropTypes } from 'react'

const Message = ({
    message: { message, messageType },
    onDismiss,
  }) => {
  return (
    <div className={`alert alert-${messageType}`}>
        <button className="close" type="button" onClick={onDismiss}>
            <span>&times;</span>
        </button>
        {message}
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.object,
  onDismiss: PropTypes.func,
}

export default Message
