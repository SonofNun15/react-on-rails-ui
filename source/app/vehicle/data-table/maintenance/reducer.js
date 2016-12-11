import * as actions from './actions'

import MaintenanceViewModel from '../../../view-models/maintenance'

export default function maintenanceReducer(state, action) {
  switch(action.type) {
    case actions.SHOW_MAINTENANCE_EDITOR:
      return new MaintenanceViewModel({
        ...state,
        editing: true,
      })

    case actions.CLOSE_MAINTENANCE_EDITOR:
      return new MaintenanceViewModel({
        ...state,
        editing: false,
      })

    case actions.MAINTENANCE_SAVED: {
      return new MaintenanceViewModel({
        ...state,
        ...action.maintenance,
        editing: false,
      })
    }

    default:
      return state
  }
}
