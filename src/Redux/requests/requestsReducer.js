import { SETREQ, CLEAR, CHANGESTATUS } from "./requestsConstants";

var initialState = [];

var requestsReducer = (state = initialState, action) => {
  var { type, payload } = action;
  switch (type) {
    case SETREQ:
      return [...state, payload.obj];
    case CLEAR:
      return [];
    case CHANGESTATUS:
      return [...state.map(item=>{
        if(item.docId === payload.id){
          item.status = payload.value;
          return item;
        }else return item;
      })]
    default:
      return state;
  }
};

export default requestsReducer;
