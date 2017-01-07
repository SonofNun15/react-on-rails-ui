import httpCodes from './httpCodes'
import { getStore } from '../redux/store'
import { showError, showWarning } from '../messages/actions'
import { push } from 'react-router-redux'

const baseApiUrl = 'http://localhost:3000'

function makeUrl(relativePath) {
  return `${baseApiUrl}/${relativePath}`
}

export function get(relativePath) {
  const request = makeRequest(makeUrl(relativePath), 'GET')
  const promise = fetch(request)
  return handleRequest(promise)
}

export function post(relativePath, data) {
  const request = makeRequest(makeUrl(relativePath), 'POST', data)
  const promise = fetch(request)
  return handleRequest(promise)
}

export function patch(relativePath, data) {
  const request = makeRequest(makeUrl(relativePath), 'PATCH', data)
  const promise = fetch(request)
  return handleRequest(promise)
}

export function del(relativePath) {
  const request = makeRequest(makeUrl(relativePath), 'DELETE')
  const promise = fetch(request)
  return handleRequest(promise)
}

function handleRequest(promise) {
  return promise.then(response => {
    const { status } = response
    const store = getStore()

    if (status == httpCodes.noContent) {
      return
    } else if (httpCodes.success(status)) {
      return response.json()
    } else if (status == httpCodes.unauthorized) {
      store.dispatch(push('/'))
      throw new Error('unauthorized')
    } else if (status == httpCodes.forbidden) {
      store.dispatch(showError('You lack permission to perform the indicated action'))
      throw new Error('forbidden')
    } else if (status == httpCodes.invalidRequest) {
      store.dispatch(showWarning(response.json()))
      throw new Error('validation error')
    } else {
      throw new Error('server error')
    }
  })
}

function makeRequest(path, method, data) {
  const headers = new Headers({ "Content-Type": "application/json" })
  return new Request(path, {
    method,
    headers,
    credentials: 'include',
    body: (data != null ? JSON.stringify(data) : null),
  })
}
