export const SHOW_ERROR = 'SHOW_ERROR'
export const DISMISS_MESSAGE = 'DISMISS_MESSAGE'

export function showError(error) {
  return { type: SHOW_ERROR, error }
}

export function dismissMessage(messageId) {
  return { type: DISMISS_MESSAGE, messageId }
}
