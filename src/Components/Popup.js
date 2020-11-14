import React from 'react';
import { connect } from 'react-redux';
import { setReq } from './../Redux/currentReq/currentReqActions';
import { withStyles } from '@material-ui/core';


var styles = (theme)=>({
    root:{
        
    }
})

class Popup extends React.Component{
    render = ()=>{
        var {req} = this.props;
        if(req)
        return(
            <div>

            </div>
        )
        else return <div></div>
    }
}

var mapState = (state) =>({
    req:state.currentReq
})
var actions = {
    setReq,
}

export default connect(mapState,actions)(withStyles(styles)(Popup));