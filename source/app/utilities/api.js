import Vehicle from '../vehicle/model'

class MileageApi {
  constructor() {
    this.loggedIn = true// false
    this.mockUser = {
      name: 'Josh Graber',
      email: 'jgraber@covermymeds.com',
      gravatarHash: '',
    }

    this.nextVehicleId = 3
    this.mockVehicles = [
      new Vehicle({
        id: 1,
        year: '2012',
        make: 'Toyota',
        model: 'Camry',
        color: 'Silver',
        mileage: 202142,
      }),
      new Vehicle({
        id: 2,
        year: '2003',
        make: 'Honda',
        model: 'Odyssey',
        color: 'Cyan',
        mileage: 190230,
      }),
    ]

    this.delay = 500
  }

  getVehicles() {
    return this.mock(this.mockVehicles)
  }

  createVehicle(vehicle) {
    const newVehicle = new Vehicle(vehicle)
    this.mockVehicles = [
      ...this.mockVehicles,
      vehicle,
    ]
    return this.mock(newVehicle, () => {
      newVehicle.id = this.nextVehicleId
      this.nextVehicleId++
    })
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
    //return this.mockError('Failed to logout!')
    return this.mock(null, () => { this.loggedIn = false })
  }

  mock(data, execute) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (execute) { execute() }
        resolve(data)
      }, this.delay)
    })
  }

  mockError(error) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(error)
      }, this.delay)
    })
  }
}

const api = new MileageApi()

export default api
