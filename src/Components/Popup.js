import React from 'react';
import { connect } from 'react-redux';
import { setReq ,acceptReq} from './../Redux/currentReq/currentReqActions';
import { withStyles, Paper, Typography, Button } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import {getRequests} from './../Redux/requests/requestsActions';


var styles = (theme)=>({
    root:{
        width: "100%",
        height:"100vh",
        position: "absolute",
        top:"0",
        left:"0",
        zIndex: "2500",
        background: "rgba(20,20,20,0.5)",
        transition: "all 500ms ease-in-out",
    },
    papper:{
        // background: "white",
    },
    container:{
        width: "300px",
        // boxShadow: "0px 0px 10px 20px black"
        animationName: `$glow`,
        animationDuration: "1000ms",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
        animationDirection: "reverse",
    },
    "@keyframes glow":{
        "0%":{
            boxShadow: "0px 0px 20px 20px #eb2f06"
        },
        "80%":{
            boxShadow: "0px 0px 2px 3px #eb2f06"
        },
        "100%":{
            boxShadow: "0px 0px 20px 20px #eb2f06"
        }
    },
    imageDiv:{
        display: "flex",
        justifyContent: "center"
    },
    avatar:{
        width: "100px",
        height: "100px",
        border: "8px solid #3498db",
        boxShadow: "1px 1px 1px 10px rgba(0,144,255,0.5)",
        margin: "20px -5px",
    },
    name:{
        fontFamily: "'Roboto Slab', serif",
        fontWeight: "600",
        fontSize: "30px",
        // color:"#27ae60",
    },
    button:{
        margin: "10px 0"
    },
    place:{
        margin: "20px 0"
    }
})

class Popup extends React.Component{
    componentDidMount=()=>{
        //Scroll with screen
        let popUpDiv = document.querySelector('.reqPopup');
        window.addEventListener('scroll',(e)=>{
            popUpDiv.style.transform = `translateY(${window.scrollY}px)`;
        })
    }
    getDirection=(lat,lng)=>{
        window.open(
            `https://www.google.com/maps/dir/${lat},${lng}`,
            "_blank"
          );
    }
    render = ()=>{
        if(this.props.req){
            var {req:{id,userName,placeName,location:{latitude,longitude},images},classes,setReq,acceptReq,getRequests,user} = this.props;
            return(
                <div className={`${classes.root} reqPopup flex`}>
                    <div className={classes.container}>
                    <Paper elevation={3} className={classes.paper}>
                        <div className={classes.imageDiv}>
                            <Avatar className={classes.avatar} src={images[0]}/><Avatar className={classes.avatar} src={user.images[0]}/>
                        </div>
                        <Typography align="center" className={classes.name}>{userName}</Typography>
                        <Typography align="center" onClick={()=>this.getDirection(latitude,longitude)} className={classes.place}>{placeName}</Typography>
                        <Typography align="center" ><Button variant="outlined" onClick={()=>setReq(null)} className={classes.button} color="secondary">Cancel</Button>&nbsp;&nbsp;<Button variant="outlined" onClick={()=>acceptReq(id,getRequests)} className={classes.button} color="primary">Confirm</Button></Typography>
                    </Paper>
                    </div>
                </div>
            )
        }
        else return <div className="reqPopup"></div>
    }
}

var mapState = (state) =>({
    req:state.currentReq,
    user: state.user,
})
var actions = {
    setReq,
    acceptReq,
    getRequests,
}

export default connect(mapState,actions)(withStyles(styles)(Popup));