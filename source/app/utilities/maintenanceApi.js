import { post, patch, del } from './baseApi'

export function saveMaintenance(vehicleId, maintenance) {
  if (maintenance.id != null) {
    return patch(`vehicles/${vehicleId}/maintenance/${maintenance.id}`, maintenance)
  } else {
    return post(`vehicles/${vehicleId}/maintenance`, maintenance)
  }
}

export function deleteMaintenance(vehicleId, maintenanceId) {
  return del(`vehicles/${vehicleId}/maintenance/${maintenanceId}`)
}
