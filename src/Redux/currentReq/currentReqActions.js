import firebase from '../../Util/Firebase'
export var setReq = (req) => {
  return {
    type: "SET_REQ",
    payload: { req, }
  };
};

export var acceptReq = (id)=>{
  firebase.firestore().collection("requests").doc(id).update({status:"ACCEPTED"});
}
