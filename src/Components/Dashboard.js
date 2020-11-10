import { withStyles } from '@material-ui/core';
import React from 'react';
import ProfileStepper from './ProfileStepper'

var styles = (theme) => ({
    stepper: {
        width: "500px",
        background: "white",
        padding: "20px",
        borderRadius: "10px"
    },
    wrapper:{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#dfe6e9",
        
    }
})

class Dashboard extends React.Component {
    state = {
        nickname: "",
        phonenNumber: ""
    }
    render = () => {
        const { classes } = this.props;
        return <div className={classes.wrapper}>
            <div className={classes.stepper}>
                <ProfileStepper />
            </div>
        </div>
    }
}

export default withStyles(styles)(Dashboard);