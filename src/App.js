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
      snap.docChanges().forEach((change)=>{
        if(change.type === "added"){
          let req = change.doc.data();
          if(req)
            this.props.setReq(req);
        }
      })
    })

  }
  render = () => {
    
    return (
      <div>
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
  alert: state.alert
})

export default connect(mapState, actions)(withRouter(App));

