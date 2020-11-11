import { Button, withStyles } from '@material-ui/core';
import React from 'react';
import ProfileStepper from './ProfileStepper'
import firebase from '../Util/Firebase'
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react';

var styles = (theme) => ({
    stepper: {
        width: "500px",
        background: "white",
        padding: "20px",
        borderRadius: "10px"
    },
    wrapper: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#dfe6e9",

    }
})

class Dashboard extends React.Component {
    state = {
        userInfoExists: false
    }
    componentDidUpdate = async (preProp) => {
        if (preProp !== this.props) {
            if (!this.state.userInfoExists && this.props.user.uid) {
                let query = await firebase.firestore().collection("users").doc(this.props.user.uid).get();
                let user = query.data();
                if (user.beverages && user.duration && user.nickname && user.phoneNumber) {
                    this.setState({
                        userInfoExists: true
                    })
                } else {
                    this.setState({
                        userInfoExists: false
                    })
                }
            }

        }
    }
    render = () => {
        const { classes } = this.props;
        return <div className={classes.wrapper}>
            <div className={classes.stepper}>
                {!this.state.userInfoExists && <ProfileStepper />}
                {this.state.userInfoExists && (<div style={{display: "flex",flexFlow:"column",justifyContent:"center",alignItems:"center"}}><h2>You Haven't Done any meeting yet</h2><Button variant="contained" color="primary" onClick={()=>{this.props.history.push("MeetingDashboard")}}>Start A Meeting</Button></div>)}
            </div>
        </div>
    }
}

var mapState = (state) => ({
    user: state.user,
})

export default connect(mapState)(withStyles(styles)(Dashboard));