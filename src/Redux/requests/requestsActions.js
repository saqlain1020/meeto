import store from "../store";
import firebase from "../../Util/Firebase";
import { SETREQ, CLEAR, CHANGESTATUS } from "./requestsConstants";

var userExists = () => {
  return new Promise(async (resolve) => {
    let time = 0;
    let int = setInterval(() => {
      time++;
      console.log("notfound");
      if (store.getState().user.uid && time < 50) {
        console.log("found");
        clearInterval(int);
        resolve(true);
      }
    }, 300);
  });
};

export var clearRequest = () => ({
  type: CLEAR,
});

export var getRequests = () => async (dispatch) => {
  //wait for store.user update
  await userExists();

  let data = await firebase
    .firestore()
    .collection("requests")
    .where("sentTo", "==", store.getState().user.uid)
    .get();
  data.forEach(async (doc) => {
    let obj = doc.data();
    obj.docId = doc.id;
    obj.images = [];
    let storageRef = firebase.storage().ref(`Images/${obj.sentBy}`);
    let result = await storageRef.listAll();
    for (let i = 0; i < result.items.length; i++) {
      let imageRef = result.items[i];
      let url = await imageRef.getDownloadURL();
      obj.images = [...obj.images, url];
    }
    dispatch({
      type: SETREQ,
      payload: {
        obj,
      },
    });
  });
  data = await firebase
    .firestore()
    .collection("requests")
    .where("sentBy", "==", store.getState().user.uid)
    .where("status", "!=", "PENDING")
    .get();
  data.forEach(async (doc) => {
    let obj = doc.data();
    obj.docId = doc.id;
    obj.images = [];
    let storageRef = firebase.storage().ref(`Images/${obj.sentBy}`);
    let result = await storageRef.listAll();
    for (let i = 0; i < result.items.length; i++) {
      let imageRef = result.items[i];
      let url = await imageRef.getDownloadURL();
      obj.images = [...obj.images, url];
    }
    obj.userName = obj.selectedUserName;
    dispatch({
      type: SETREQ,
      payload: {
        obj,
      },
    });
  });
};
export var changeStatus = (id, value) => async (dispatch) => {
  await firebase.firestore().collection("requests").doc(id).update({status: value})
  dispatch({
    type: CHANGESTATUS,
    payload:{
      value,
      id,
    },
  })
};
