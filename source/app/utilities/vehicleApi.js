import { get, post, patch, del } from './baseApi'

export function getVehicles() {
  return get('vehicles')
}

export function saveVehicle(vehicle) {
  if (vehicle.id != null) {
    return patch(`vehicles/${vehicle.id}`, vehicle)
  } else {
    return post('vehicles', vehicle)
  }
}

export function deleteVehicle(id) {
  return del(`vehicles/${id}`)
}
