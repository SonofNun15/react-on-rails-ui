export const SHOW_ERROR = 'SHOW_ERROR'
export const SHOW_WARNING = 'SHOW_WARNING'
export const DISMISS_MESSAGE = 'DISMISS_MESSAGE'

export function showError(error) {
  return { type: SHOW_ERROR, error }
}

export function showWarning(warning) {
  return { type: SHOW_WARNING, warning }
}
export function dismissMessage(messageId) {
  return { type: DISMISS_MESSAGE, messageId }
}
