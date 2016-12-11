import Maintenance from '../models/maintenance'

class MaintenanceViewModel extends Maintenance {
  constructor(maintenance, isLastMaintenance, requiresMaintenance) {
    super(maintenance, isLastMaintenance, requiresMaintenance)

    this.editing = maintenance.editing
  }
}

export default MaintenanceViewModel
