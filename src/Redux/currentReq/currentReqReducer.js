var initialState = null;

var currentReqReducer = (state = initialState, action)=>{
    var {type,payload} = action;
    switch(type){
        case "SET_REQ":
            return payload.req;
        default:
            return state;
    }
}
export default currentReqReducer;