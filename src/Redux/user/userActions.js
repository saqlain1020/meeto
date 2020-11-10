import firebase from '../../Util/Firebase'
import { LOGINWITHFACEBOOK, SETLOCATION, SETUSER, SIGNINEMAILPASS, SIGNOUT, SIGNUP } from "./userConstants"

export var signInWithEmailPassword = (email, password) => async (dispatch) => {
    let user = await firebase.auth().signInWithEmailAndPassword(email, password)
    dispatch({
        type: SIGNINEMAILPASS,
        payload: {
            user,
        }
    })
}

export var loginwithfacebook = () => async (dispatch) => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // var token = result.credential.accessToken;
        let user = result.user;
        dispatch({
            type: LOGINWITHFACEBOOK,
            payload: {
                user,
            }
        })
    })
}

export var signOut = () =>async (dispatch)=>{
    let user = await firebase.auth().signOut();
    dispatch({
        type: SIGNOUT,
        payload: {
            user: {}
        }
    })
}

export var signUpWithEmailPassword = (email, password) => async (dispatch) => {
    let user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    dispatch({
        type: SIGNUP,
        payload: {
            user,
        }
    })
}
export var setUser = (user)=>{
    return {
        type: SETUSER,
        payload: {
            user,
        }
    }
}

export var setLocation = (location)=>{
    return {
        type: SETLOCATION,
        payload: {
            location,
        }
    }
}