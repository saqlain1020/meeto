import { SETREQ } from "./requestsConstants";

var initialState = [];

var requestsReducer = (state= initialState,action)=>{
    var {type,payload} = action;
    switch(type){
        case SETREQ:
            return payload.requests;
        default:
            return state;
    }
}

export default requestsReducer;