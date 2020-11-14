import {combineReducers} from 'redux'
import similarUsersReducer from './similarUsers/similarUsersReducer';
import userReducer from './user/userReducer'
import alertReducer from './alert/alertReducer';
import requestsReducer from './requests/requestsReducer';
import currentReqReducer from './currentReq/currentReqReducer';

var rootReducer = combineReducers({
    user: userReducer,
    similarUsers: similarUsersReducer,
    alert: alertReducer,
    requests: requestsReducer,
    currentReq: currentReqReducer,
})

export default rootReducer;