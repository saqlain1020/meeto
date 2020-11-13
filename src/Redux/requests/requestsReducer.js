import { SETREQ } from "./requestsConstants";

var initialState = [];

var requestsReducer = (state= initialState,action)=>{
    var {type,payload} = action;
    switch(type){
        case SETREQ:
            return [...state,payload.obj];
        default:
            return state;
    }
}

export default requestsReducer;