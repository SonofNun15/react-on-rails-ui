const delay = 2000

class MileageApi {
  constructor() {
    this.loggedIn = false
    this.mockUser = {
      name: 'Josh Graber',
      email: 'jgraber@covermymeds.com',
      gravatarHash: '',
    }
  }

  getVehicles() {
    return this.mock([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ])
  }

  getProfile() {
    return this.mock(this.loggedIn
      ? this.mockUser
      : null)
  }

  login() {
    return this.mock(this.mockUser, () => { this.loggedIn = true })
  }

  logout() {
    return this.mock(null, () => { this.loggedIn = false })
  }

  mock(data, execute) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (execute) { execute() }
        resolve(data)
      }, delay)
    })
  }
}

const api = new MileageApi()

export default api
