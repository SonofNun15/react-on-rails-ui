import { post, patch, del } from './baseApi'

export function saveFueling(vehicleId, fueling) {
  if (fueling.id != null) {
    return patch(`vehicles/${vehicleId}/fuelings/${fueling.id}`, fueling)
  } else {
    return post(`vehicles/${vehicleId}/fuelings`, fueling)
  }
}

export function deleteFueling(vehicleId, fuelingId) {
  return del(`vehicles/${vehicleId}/fuelings/${fuelingId}`)
}
