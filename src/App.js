import React from 'react';
import './App.css';
import Login from './Components/Login';
import {auth} from './Util/Firebase';
import {withRouter} from 'react-router-dom'
import Routes from './Routes';
import {setUser} from './Redux/user/userActions'
import {connect} from 'react-redux'

class App extends React.Component { F
  componentDidMount=()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        this.props.setUser(user);
        this.props.history.push("/Dashboard");
      }else{
        this.props.history.push("/Login");
      }

    })
  }
  render = () => {
    return (
      <div>
        <Routes/>
      </div>
    );
  }
}

var actions = {
  setUser,
}

export default connect(null,actions)(withRouter(App));
