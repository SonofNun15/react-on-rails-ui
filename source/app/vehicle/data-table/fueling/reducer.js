import * as actions from './actions'

import FuelingViewModel from '../../../view-models/fueling'

export default function fuelingReducer(state, action) {
  switch(action.type) {
    case actions.SHOW_FUELING_EDITOR:
      return new FuelingViewModel({
        ...state,
        editing: true,
      })

    case actions.CLOSE_FUELING_EDITOR:
      return new FuelingViewModel({
        ...state,
        editing: false,
      })

    case actions.FUELING_SAVED: {
      return new FuelingViewModel({
        ...state,
        ...action.fueling,
        editing: false,
      })
    }

    default:
      return state
  }
}
