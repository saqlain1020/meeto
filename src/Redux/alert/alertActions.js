export var setAlert = (msg, status) => async (dispatch) => {
  dispatch({
    type: "SET_ALERT",
    payload: {
      msg,
      status,
    },
  });
  setTimeout(()=>{
    dispatch({
        type: "REMOVE_ALERT",
      });
  },5000)
};
