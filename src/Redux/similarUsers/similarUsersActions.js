import store from '../store';
import { GETSIMUSER } from './similarUsersConstants';
import firebase from '../../Util/Firebase'


var getDistance=(location1,location2)=>{
    const R = 6371e3; // metres
    const φ1 = location1.latitude * Math.PI/180; // φ, λ in radians
    const φ2 = location2.latitude * Math.PI/180;
    const Δφ = (location2.latitude-location1.latitude) * Math.PI/180;
    const Δλ = (location2.longitude-location2.longitude) * Math.PI/180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const d = R * c; // in metres
    return Math.abs(d/1000) //in km
}





export var getUsers = () => async (dipatch) => {
    let { beverages, duration, location } = store.getState().user;
    let arr = [];
    let query = await firebase.firestore().collection("users").get();
    query.forEach(doc => {
        let user = doc.data();
        user.images = [];

        var storageRef = firebase.storage().ref(`Images/${doc.id}`);
        storageRef.listAll().then(function(result) {
          result.items.forEach(function(imageRef) {
            imageRef.getDownloadURL().then(function(url) {
                user.images.push(url)
              }).catch(function(error) {
                console.log(error)
              });
          });
        }).catch(function(error) {
            console.log(error)
        });

        console.log(user);
        let bevF = beverages.some(r=> user.beverages.includes(r));
        let duF = duration.some(r=> user.duration.includes(r));
        // console.log(getDistance(user.location, location))
        // console.log(bevF)
        // console.log(duF);
        if (getDistance(user.location, location) <= 5 && bevF && duF) {
            arr.push(user);
        }
    })
    console.log(arr);
    dipatch({
        type: GETSIMUSER,
        payload: {
            users: arr
        }
    })
}