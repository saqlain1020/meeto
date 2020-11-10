import { Button } from '@material-ui/core';
import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux';
import { signOut } from '../Redux/user/userActions'

const HoverLogoutBtn = (props) => {
    return (
        <div style={{ position: "absolute", left: "calc(100vw - 100px", top: "10px", overflow: "hidden" }} >
            <Button onClick={props.signOut} variant="contained" color="primary" style={{ borderRadius: "360px", overflow: "hidden" }}><ExitToAppIcon /></Button>
        </div>
    );
}

var actions = {
    signOut,
}

export default connect(null, actions)(HoverLogoutBtn);
