import Vehicle from '../models/vehicle'

class MileageApi {
  constructor() {
    this.loggedIn = true// false
    this.mockUser = {
      name: 'Josh Graber',
      email: 'jgraber@covermymeds.com',
      gravatarHash: '',
    }

    this.nextVehicleId = 3
    this.nextFuelingId = 4
    this.nextMaintenanceId = 2

    this.mockVehicles = [
      new Vehicle({
        id: 1,
        year: '2012',
        make: 'Toyota',
        model: 'Camry',
        color: 'Silver',
        baseMileage: 202142,
        fuelings: [
          { id: 1, miles: 300, gas: 15, cost: 30, date: new Date(2016, 11, 1)}
        ],
      }),
      new Vehicle({
        id: 2,
        year: '2003',
        make: 'Honda',
        model: 'Odyssey',
        color: 'Cyan',
        baseMileage: 190230,
        fuelings: [
          { id: 2, miles: 310, gas: 15.2, cost: 32, date: new Date(2016, 10, 22) },
          { id: 3, miles: 203, gas: 12, cost: 25, date: new Date(2016, 10, 25) },
        ],
        maintenance: [
          { id: 1, mechanic: "Erb's Automotive", description: "Oil and turn signal", cost: 254, date: new Date(2016, 10, 23) },
        ],
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
