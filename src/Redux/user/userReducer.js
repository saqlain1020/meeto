import { LOGINWITHFACEBOOK, SETLOCATION, SETUSER, SIGNINEMAILPASS, SIGNOUT, SIGNUP } from "./userConstants";

var initialState = {};

var userReducer = (state = initialState, action) => {
    var { type, payload } = action;
    switch (type) {
        case SIGNINEMAILPASS:
            return payload.user;
        case LOGINWITHFACEBOOK:
            return payload.user;
        case SIGNOUT:
            return payload.user;
        case SIGNUP:
            return payload.user;
        case SETUSER:
            return payload.user;
        case SETLOCATION:
            return {...state,location:payload.location}
        default:
            return state;
    }
}
export default userReducer;