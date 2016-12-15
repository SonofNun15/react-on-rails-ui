import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import messages from '../messages/reducer'
import profile from '../profile/reducer'
import vehicleList from '../vehicle-list/reducer'
import userEditor from '../user-editor/reducer'

const rootReducer = combineReducers({
  messages,
  profile,
  vehicleList,
  userEditor,
  routing,
})

export default rootReducer
