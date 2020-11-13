import store from "../store"
import firebase from "../../Util/Firebase"
import { SETREQ } from "./requestsConstants";

var userExists = () => {
    return new Promise(async (resolve) => {
        let time = 0;
        let int = setInterval(() => {
            time++;
            console.log("notfound")
            if (store.getState().user.uid && time<50) {
                console.log("found")
                clearInterval(int);
                resolve(true);
            }
        }, 300)
    })
}

export var getRequests = () => async (dispatch) => {
    //wait for store.user update
    await userExists();
    let requests = [];
    let data = await firebase.firestore().collection("requests").where("sentTo", "==", store.getState().user.uid).get();
    data.forEach(async doc => {
        let obj = doc.data();
        obj.docId = doc.id;
        obj.images = [];
        let storageRef = firebase.storage().ref(`Images/${obj.sentBy}`);
        await storageRef.listAll().then(function (result) {
            result.items.forEach(async function (imageRef) {
                await imageRef.getDownloadURL().then(function (url) {
                    obj.images.push(url)
                })
            });
        })
        requests.push(obj);
        dispatch({
            type: SETREQ,
            payload: {
                requests,
            }
        })

    })

    
}

