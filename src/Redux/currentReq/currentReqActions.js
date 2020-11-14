export var setReq = (req) => {
  return {
    type: "SET_REQ",
    payload: { req, }
  };
};
