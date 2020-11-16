import React from 'react';
import './App.css';
import { auth } from './Util/Firebase';
import { withRouter } from 'react-router-dom'
import Routes from './Routes';
import { setUser } from './Redux/user/userActions'
import { connect } from 'react-redux'
import firebase from './Util/Firebase'
import { setAlert } from './Redux/alert/alertActions';
import { setReq } from './Redux/currentReq/currentReqActions';
import Popup from './Components/Popup';
import swal from 'sweetalert';

class App extends React.Component {

  componentDidMount = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        let data = await firebase.firestore().collection("users").doc(user.uid).get()
        data = data.data()
        if (data) {
          this.props.setUser(data);
        }
        if(this.props.history.location.pathname === "/Login" || this.props.history.location.pathname === "/")
          this.props.history.push("/Dashboard");
      } else {
        this.props.history.push("/Login");
      }
    })
    window.onerror = (message, source, lineno, colno, error)=> {
      this.props.setAlert(message,"error");
    }
    
    //Firebase listener
    firebase.firestore().collection("requests").onSnapshot((snap)=>{
      console.log("in listener");
      snap.docChanges().forEach(async(change)=>{
        if(change.type === "added"){
          let req = change.doc.data();
          req.id = change.doc.id;

          let data = await firebase.firestore().collection("users").doc(req.sentBy).get()
          data = data.data();
          req.images = data.images;
          req && req.sentTo === this.props.user.uid && req.status === "PENDING" && this.props.setReq(req);
        }
      })
    })

    //
    this.handlePermission();
  }
  handlePermission =()=> {
    navigator.permissions.query({name:'geolocation'}).then((result)=> {
      if (result.state === 'granted') {
        this.report(result.state);
      } else if (result.state === 'prompt') {
        this.report(result.state);
        navigator.geolocation.getCurrentPosition(()=>setAlert("Location Enabled","success"),()=>swal("Enable Location :/","","error"));
      } else if (result.state === 'denied') {
        this.report(result.state);
        // geoBtn.style.display = 'inline';
      }
      result.onchange = () =>{
        this.report(result.state);
      }
    });
  }
  
  report=(state)=> {
    console.log('Permission ' + state);
  }
  render = () => {
    return (
      <div>
        <Popup/>
        {this.props.alert}
        <Routes />
        
      </div>
    );
  }
}

var actions = {
  setUser,
  setAlert,
  setReq,
}

var mapState = (state)=>({
  user: state.user,
  alert: state.alert
})

export default connect(mapState, actions)(withRouter(App));

