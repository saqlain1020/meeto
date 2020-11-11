import React from 'react';
import './App.css';
import Login from './Components/Login';
import { auth } from './Util/Firebase';
import { withRouter } from 'react-router-dom'
import Routes from './Routes';
import { setUser } from './Redux/user/userActions'
import { connect } from 'react-redux'
import firebase from './Util/Firebase'

class App extends React.Component {
  
  componentDidMount = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        let data = await firebase.firestore().collection("users").doc(user.uid).get()
        data = data.data()
        if(data){
          this.props.setUser(data);
        }
        // this.props.history.push("/Dashboard");
      } else {
        this.props.history.push("/Login");
      }
    })
  }
  render = () => {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

var actions = {
  setUser,
}

export default connect(null, actions)(withRouter(App));
