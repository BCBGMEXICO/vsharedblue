import { combineReducers } from 'redux'
import vshelfReducer from '../components/v-shelflist/v-shelflist.reducer'
import vfilterReducer from '../components/v-filter/v-filter.reducer'
import vmenuReducer from '../components/v-menu/v-menu.reducer'

const reducers = combineReducers({
  vshelfReducer,
  vfilterReducer,
  vmenuReducer,
})

export default reducers
