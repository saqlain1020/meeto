import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDOWz4LAypqmSwbZeCCB0syLlrbGefOYRE",
    authDomain: "meet-app-3d1ce.firebaseapp.com",
    databaseURL: "https://meet-app-3d1ce.firebaseio.com",
    projectId: "meet-app-3d1ce",
    storageBucket: "meet-app-3d1ce.appspot.com",
    messagingSenderId: "875169633634",
    appId: "1:875169633634:web:57e13969b67c84e9c8c83b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export var db = firebase.firestore();
export var auth = firebase.auth();