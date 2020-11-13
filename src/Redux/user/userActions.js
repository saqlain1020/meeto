import firebase from '../../Util/Firebase'
import { INITPROFILE, LOGINWITHFACEBOOK, SETLOCATION, SETUSER, SIGNINEMAILPASS, SIGNOUT, SIGNUP ,ADDIMAGES} from "./userConstants"
import swal from "sweetalert";
import store from '../store'
import { setAlert } from './../alert/alertActions';

export var signInWithEmailPassword = (email, password) => async (dispatch) => {
    try {
        let user = await firebase.auth().signInWithEmailAndPassword(email, password)
        user = user.user;
        let data = await firebase.firestore().collection("users").doc(user.uid).get();
        data = data.data();
        let { uid, location, nickname, phoneNumber, beverages, duration } = data
        dispatch({
            type: SIGNINEMAILPASS,
            payload: {
                user: {
                    uid,
                    location,
                    nickname,
                    phoneNumber,
                    beverages,
                    duration,
                }
            }
        })
    } catch (error) {
        swal(error.message,"","error")
    }

}

export var loginwithfacebook = () => async (dispatch) => {
    try {
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(async function (result) {
            // var token = result.credential.accessToken;
            let user = result.user;
            let data = await firebase.firestore().collection("users").doc(user.uid).get();
            if (data.exists) {
                data = data.data();
                let { uid, location, nickname, phoneNumber, beverages, duration } = data
                user = {
                    uid,
                    location,
                    nickname,
                    phoneNumber,
                    beverages,
                    duration,
                }
            } else {
                await firebase.firestore().collection("users").doc(user.uid).set({ uid: user.uid });
                user = {
                    uid: user.uid,
                }
            }
            dispatch({
                type: LOGINWITHFACEBOOK,
                payload: {
                    user,
                }
            })
        })
    } catch (error) {
        console.log(error)
    }

}

export var signOut = () => async (dispatch) => {
    let user = await firebase.auth().signOut();
    dispatch({
        type: SIGNOUT,
        payload: {
            user: {}
        }
    })
}

export var signUpWithEmailPassword = (email, password) => async (dispatch) => {
    try {
        let user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        user = user.user;
        await firebase.firestore().collection("users").doc(user.uid).set({ uid: user.uid });
        user = {
            uid: user.uid,
        }
        dispatch({
            type: SIGNUP,
            payload: {
                user,
            }
        })
    } catch (error) {
        console.log(error);
    }

}
export var setUser = (user) => async (dispatch) => {
    await firebase.firestore().collection("users").doc(user.uid).update(user);
    dispatch({
        type: SETUSER,
        payload: {
            user,
        }
    })
}

export var setLocation = (location) => async(dispatch) =>{
    await firebase.firestore().collection("users").doc(store.getState().user.uid).update({location:location});
    return {
        type: SETLOCATION,
        payload: {
            location,
        }
    }
}



export var saveProfile = (obj) => async (dispatch) => {
    await firebase.firestore().collection("users").doc(store.getState().user.uid).update(obj);
    dispatch({
        type: INITPROFILE,
        payload: {
            obj,
        }
    })
}

export var uploadImages = (files) => async (dispatch) => {
    let ref = firebase.storage().ref().child(`Images/${store.getState().user.uid}/`);
    await files.forEach(async(img)=>{
        await ref.child(img.name).put(img).then(function(snapshot) {
            console.log("image");
            console.log(snapshot);
          });
    })
    // let user = store.getState().user;
    let images = [];
        let result = await ref.listAll()
        result.items.forEach(async function(imageRef) {
            let url = await imageRef.getDownloadURL()
              images.push(url)
          });
       
        
        dispatch({
            type: ADDIMAGES,
            payload:{
                images,
            }
        })

        let inv = setInterval(()=>{
            if(images.length > 0){
                firebase.firestore().collection("users").doc(store.getState().user.uid).update({images,});
                clearInterval(inv);
            }
        },300)
        

}
