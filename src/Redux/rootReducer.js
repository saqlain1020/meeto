import {combineReducers} from 'redux'
import similarUsersReducer from './similarUsers/similarUsersReducer';
import userReducer from './user/userReducer'
import alertReducer from './alert/alertReducer';

var rootReducer = combineReducers({
    user: userReducer,
    similarUsers: similarUsersReducer,
    alert: alertReducer
})

export default rootReducer;