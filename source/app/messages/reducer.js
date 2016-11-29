import * as actions from './actions'

const defaultState = []

export default function messagesReducer(state = defaultState, action) {
  switch(action.type) {
    case actions.SHOW_ERROR: {
      const newMessage = generateError(action.error)
      const messages = state.concat([newMessage])
      return messages.slice(0, 2)
    }

    case actions.DISMISS_MESSAGE: {
      let messages = [...state]
      messages.splice(action.messageId, 1)
      return messages
    }

    default:
      return state
  }
}

function generateError(error) {
  return {
    message: error,
    messageType: 'danger',
    messageDuration: 5000,
  }
}
