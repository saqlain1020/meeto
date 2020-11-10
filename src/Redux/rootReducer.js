import {combineReducers} from 'redux'
import userReducer from './user/userReducer'

var rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer;