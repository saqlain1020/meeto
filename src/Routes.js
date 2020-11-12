import Drawer from './Components/Drawer'
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import MeetingDashboard from './Components/MeetingDashboard';

var Routes = () => {
    return <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Dashboard" render={(props)=>( <div><Drawer/><Dashboard {...props}/></div>)} />
        <Route path="/MeetingDashboard" render={(props)=>( <div><Drawer/><MeetingDashboard {...props}/></div>)} />
    </Switch>
}

export default Routes;