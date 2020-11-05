import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Login';

var Routes = () => {
    return <Switch>
        <Route path="/Login" render={(props) => { <Login /> }} />
    </Switch>
}

export default Routes;