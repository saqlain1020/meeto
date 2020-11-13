import { SETREQ, CLEAR } from "./requestsConstants";

var initialState = [];

var requestsReducer = (state = initialState, action) => {
  var { type, payload } = action;
  switch (type) {
    case SETREQ:
      return [...state, payload.obj];
    case CLEAR:
      return [];
    default:
      return state;
  }
};

export default requestsReducer;
