import React from 'react';
import './App.css';
import { auth } from './Util/Firebase';
import { withRouter } from 'react-router-dom'
import Routes from './Routes';
import { setUser } from './Redux/user/userActions'
import { connect } from 'react-redux'
import firebase from './Util/Firebase'
import { setAlert } from './Redux/alert/alertActions';


class App extends React.Component {

  componentDidMount = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        let data = await firebase.firestore().collection("users").doc(user.uid).get()
        data = data.data()
        if (data) {
          this.props.setUser(data);
        }
        if(this.props.history.location.pathname === "/Login")
          this.props.history.push("/Dashboard");
      } else {
        this.props.history.push("/Login");
      }
    })
    window.onerror = (message, source, lineno, colno, error)=> {
      this.props.setAlert(message,"error");
    }
    // this.props.setAlert("You have succesfull Logged","success");
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
}

var mapState = (state)=>({
  alert: state.alert
})

export default connect(mapState, actions)(withRouter(App));

