import firebase from '../../Util/Firebase'
import swal from 'sweetalert';
export var setReq = (req) => {
  return {
    type: "SET_REQ",
    payload: { req, }
  };
};

export var acceptReq = (id,getRequests)=>async (dispatch)=>{
  await firebase.firestore().collection("requests").doc(id).update({status:"ACCEPTED"}).then(swal("Request Accepted","","success"));
  getRequests();
  dispatch( {
    type: "SET_REQ",
    payload: { req:null, }
  })
}
