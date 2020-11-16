import { INITPROFILE, LOGINWITHFACEBOOK, SETLOCATION, SETUSER, SIGNINEMAILPASS, SIGNOUT, SIGNUP,ADDIMAGES } from "./userConstants";

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
            let user = {...state,location:payload.location};
            return user;
        case INITPROFILE:
            return {...state,...payload.obj}
        case ADDIMAGES:
                return {...state,images:payload.images}
        default:
            return state;
    }
    
}
export default userReducer;