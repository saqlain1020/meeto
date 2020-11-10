import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import HoverLogoutBtn from './Components/HoverLogoutBtn';
import Login from './Components/Login';

var Routes = () => {
    return <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Dashboard" render={(props)=>( <div><HoverLogoutBtn/><Dashboard {...props}/></div>)} />
    </Switch>
}

export default Routes;