import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import messages from '../messages/reducer'
import profile from '../profile/reducer'
import vehicleList from '../vehicle-list/reducer'

const rootReducer = combineReducers({
  messages,
  profile,
  vehicleList,
  routing,
})

export default rootReducer
