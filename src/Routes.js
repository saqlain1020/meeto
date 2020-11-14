import Drawer from './Components/Drawer'
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import MeetingDashboard from './Components/MeetingDashboard';
import ProfileStepper from './Components/ProfileStepper';

var Routes = () => {
    return <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Dashboard" render={(props)=>( <div><Drawer {...props}><Dashboard {...props}/></Drawer></div>)} />
        <Route path="/MeetingDashboard" render={(props)=>( <div><Drawer {...props}><MeetingDashboard {...props}/></Drawer></div>)} />
        <Route path="/Settings" render={(props)=>(<div><Drawer {...props}>
                <div className="bg" style={{height: "100vh",display: "flex",justifyContent: "center",alignItems: "center",}}>
                    <div style={{width: "500px",padding: "20px",background: "white",borderRadius: "10px",}}>
                    <ProfileStepper {...props}/>
                    </div>
                </div>
            </Drawer></div>)}
        />
    </Switch>
}

export default Routes;