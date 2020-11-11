import {combineReducers} from 'redux'
import similarUsersReducer from './similarUsers/similarUsersReducer';
import userReducer from './user/userReducer'

var rootReducer = combineReducers({
    user: userReducer,
    similarUsers: similarUsersReducer,
})

export default rootReducer;