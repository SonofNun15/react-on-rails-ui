import httpCodes from './httpCodes'

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

    if (status == httpCodes.noContent) {
      return
    } else if (httpCodes.success(status)) {
      return response.json()
    } else if (status == httpCodes.unauthorized) {
      //dispatch(push('/'))
      console.log('Redirect home')
      throw 'unauthorized'
    } else if (status == httpCodes.forbidden) {
      //dispatch(showError('You lack permission to perform the indicated action'))
      console.log('show permission error')
      throw 'forbidden'
    } else if (status == httpCodes.invalidRequest) {
      // process validation error and display
      console.log('validation error')
      throw 'validation error'
    } else {
      console.log('error!')
      throw 'error'
    }
  }, error => {
    console.log(error)
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
