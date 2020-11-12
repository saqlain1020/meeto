import { Button, Container, Grid, makeStyles, TextField, withStyles } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import React from 'react';
import bg from "../Images/Login-bg.jpg"
import firebase from "../Util/Firebase"
import swal from "@sweetalert/with-react";
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import {signInWithEmailPassword, loginwithfacebook,signUpWithEmailPassword} from '../Redux/user/userActions'
import { setAlert } from './../Redux/alert/alertActions';

const styles = (theme) => ({
    wrapper: {
        // background: "#101010",
        backgroundImage: `url('${bg}')`,
        backgroundSize: "cover",
    },
    textField: {
        background: "#272727",
        color: "white",
        outline: "white",
        borderRadius: "5px",
        padding: "5px",

    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    loginWrapper: {
        height: "450px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexFlow: "column",
        background: "rgba(0,0,0,0.5)",
        padding: 30,
        borderRadius: 10,
    },
    input: {
        color: "white ",
        outline: "white ",
        background: "none",
        fontSize: "22px",
        fontFamily: 'Raleway',
        fontWeight: "800"
    },
    fbBtn: {
        background: "#0984e3",
        color: "white",
        fontWeight: "800",
        "&:hover": {
            background: "slateblue",
            boxShadow: "1px 1px 5px white"
        }
    },
    loginBtn: {
        background: "#27d8a1",
        color: "white",
        width: "100%",
        fontWeight: "800",
        "&:hover": {
            background: "#27d8a1",
            boxShadow: "1px 1px 5px white"
        }
    },
    heading: {
        marginBottom: "10px",
    }
})

class Login extends React.Component {
    // const classes = useStyle();
    state = {
        email: "",
        password: "",
    }
    onchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    facebookLogin = async () => {
        try {
            this.props.loginwithfacebook();
         } catch (error) {
            this.props.setAlert(error.message,"error")
         }
    }
    login = async () => {
        const { email, password } = this.state;
        try {
           this.props.signInWithEmailPassword(email,password);
        } catch (error) {
            this.props.setAlert(error.message,"error")
        }
    }
    signUp = async () => {
        const { email, password } = this.state;
        try {
           this.props.signUpWithEmailPassword(email,password);
        } catch (error) {
            this.props.setAlert(error.message,"error")
        }
    }
    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper} >
                <Container className={classes.container}>
                    <div className={classes.loginWrapper}>
                        <h1 className={`${classes.heading} mainHeading`} >MEET<span>O</span></h1>
                        <Button className={classes.fbBtn} onClick={this.facebookLogin}><FacebookIcon />Login with Facebook</Button>
                        <Grid className={classes.textField} container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <MailOutlineIcon />
                            </Grid>
                            <Grid item>
                                <input name="email" onChange={this.onchange} value={this.state.email} type="email" className={classes.input} placeholder="email" /><br></br>
                            </Grid>
                        </Grid>
                        <Grid className={classes.textField} container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <MailOutlineIcon />
                            </Grid>
                            <Grid item>
                                <input name="password" type="password" onChange={this.onchange} value={this.state.password} className={classes.input} placeholder="password" /><br></br>
                            </Grid>
                        </Grid>
                        <Button onClick={this.login} className={classes.loginBtn}>Login</Button>
                        <Button onClick={this.signUp} className={classes.loginBtn}>SignUP</Button>
                    </div>

                </Container>
            </div>
        );
    }
}

var actions = {
    signInWithEmailPassword,
    loginwithfacebook,
    signUpWithEmailPassword,
    setAlert,
}

export default connect(null,actions)(withStyles(styles)(Login));
