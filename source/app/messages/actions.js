export const SHOW_ERROR = 'SHOW_ERROR'

export function showError(error) {
  return { type: SHOW_ERROR, error }
}
