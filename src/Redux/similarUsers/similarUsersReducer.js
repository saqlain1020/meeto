import { GETSIMUSER, SETUSERS } from "./similarUsersConstants";

var initialState = [];

var similarUsersReducer = (state = initialState, action) => {
    var { type, payload } = action;
    switch (type) {
        case GETSIMUSER:
            return [...state,payload.user];
        case SETUSERS:
            return payload.users;
        default:
            return state;
    }

}
export default similarUsersReducer;