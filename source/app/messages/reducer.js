import * as actions from './actions'

const defaultState = {
  messages: [],
}

export default function messagesReducer(state = defaultState, action) {
  switch(action.type) {
    case actions.SHOW_ERROR: {
      const newMessage = generateError(action.error)
      const messages = state.messages.concat([newMessage])
      return { messages }
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
