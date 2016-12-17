import { get, post, patch, del } from './baseApi'

export function getVehicles() {
  return get('vehicles')
}

export function saveVehicle(vehicle) {
  const vehicleRequest = mapVehicle(vehicle)
  if (vehicle.id != null) {
    return patch(`vehicles/${vehicle.id}`, vehicleRequest)
  } else {
    return post('vehicles', vehicleRequest)
  }
}

export function deleteVehicle(id) {
  return del(`vehicles/${id}`)
}

function mapVehicle(vehicle) {
  return {
    ...vehicle,
    base_mileage: vehicle.baseMileage,
  }
}
