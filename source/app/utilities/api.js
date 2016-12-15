import _ from 'lodash'

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
      {
        id: 1,
        year: '2012',
        make: 'Toyota',
        model: 'Camry',
        color: 'Silver',
        baseMileage: 202142,
        fuelings: [
          { id: 1, miles: 300, gas: 15, cost: 30, date: new Date(2016, 11, 1)}
        ],
        maintenance: [],
      },
      {
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
      },
    ]

    this.delay = 500
  }

  getVehicles() {
    return this.mock(this.mockVehicles)
  }

  saveVehicle(vehicle) {
    if (vehicle.id != null) {
      const index = this.getIndex(vehicle.id)
      this.mockVehicles[index] = vehicle
    } else {
      vehicle.id = this.nextVehicleId++
      this.nextVehicleId++
      this.mockVehicles = [
        ...this.mockVehicles,
        vehicle,
      ]
    }

    return this.mock(vehicle)
  }

  deleteVehicle(id) {
    const index = this.getIndex(id)
    this.mockVehicles.splice(index, 1)
    return this.mock()
  }

  saveFueling(vehicleId, fueling) {
    const index = this.getIndex(vehicleId)
    const vehicle = this.mockVehicles[index]

    if (fueling.id != null) {
      const fuelingIndex = this.getFuelingIndex(vehicle, fueling.id)
      return this.mock(fueling, () => {
        vehicle.fuelings[fuelingIndex] = fueling
      })
    } else {
      fueling.id = this.nextFuelingId
      this.nextFuelingId++
      return this.mock(fueling, () => {
        this.mockVehicles[index].fuelings.push(fueling)
      })
    }
  }

  saveMaintenance(vehicleId, maintenance) {
    const index = this.getIndex(vehicleId)
    const vehicle = this.mockVehicles[index]

    if (maintenance.id != null) {
      const maintenanceIndex = this.getMaintenanceIndex(vehicle, maintenance.id)
      return this.mock(maintenance, () => {
        vehicle.maintenance[maintenanceIndex] = maintenance
      })
    } else {
      maintenance.id = this.nextMaintenanceId
      this.nextMaintenanceId++
      return this.mock(maintenance, () => {
        this.mockVehicles[index].maintenance.push(maintenance)
      })
    }
  }

  deleteFueling(vehicleId, fuelingId) {
    const index = this.getIndex(vehicleId)
    const vehicle = this.mockVehicles[index]
    const fuelingIndex = this.getFuelingIndex(vehicle, fuelingId)

    return this.mock(null, () => {
      vehicle.fuelings.splice(fuelingIndex, 1)
    })
  }

  deleteMaintenance(vehicleId, maintenanceId) {
    const index = this.getIndex(vehicleId)
    const vehicle = this.mockVehicles[index]
    const maintenanceIndex = this.getMaintenanceIndex(vehicle, maintenanceId)

    return this.mock(null, () => {
      vehicle.maintenance.splice(maintenanceIndex, 1)
    })
  }

  getIndex(id) {
    return _.findIndex(this.mockVehicles, v => v.id == id)
  }

  getFuelingIndex(vehicle, id) {
    return _.findIndex(vehicle.fuelings, f => f.id == id)
  }

  getMaintenanceIndex(vehicle, id) {
    return _.findIndex(vehicle.maintenance, m => m.id == id)
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

  createUser(newUser) {
    return this.mock(newUser, () => {
      this.mockUser = newUser
    })
  }

  saveUser(user) {
    this.mockUser = {
      ...this.mockUser,
      ...user,
    }
    return this.mock(this.mockUser)
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
