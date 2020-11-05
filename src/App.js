import React from 'react';
import './App.css';
import Login from './Components/Login';
import {auth} from './Util/Firebase';
import {withRouter} from 'react-router-dom'

class App extends React.Component {
  constructor(){
    super();
    auth.onAuthStateChanged((user)=>{
      if(user){
        this.props.history.push("/Dashboard");
      }else{
        this.props.history.push("/Login");
      }

    })
  }
  render = () => {
    return (
      <div>
        <Login/>
      </div>
    );
  }
}

export default withRouter(App);
