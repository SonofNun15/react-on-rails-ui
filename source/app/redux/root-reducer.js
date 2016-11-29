import { combineReducers } from 'redux'
import profile from '../profile/reducer'
import vehicleList from '../vehicle-list/reducer'

const rootReducer = combineReducers({
  profile,
  vehicleList,
})

export default rootReducer
