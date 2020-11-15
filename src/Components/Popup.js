import React from 'react';
import { connect } from 'react-redux';
import { setReq } from './../Redux/currentReq/currentReqActions';
import { withStyles, Paper, Typography, Button } from '@material-ui/core';
import { Avatar } from '@material-ui/core';



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
    //     animation-duration: 0s;
    // animation-timing-function: ease;
    // animation-delay: 0s;
    // animation-iteration-count: 1;
    // animation-direction: normal;
    // animation-fill-mode: none;
    // animation-play-state: running;
    // animation-name: glow;
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
            var {req:{userName,placeName,location:{latitude,longitude}},classes,setReq} = this.props;
            return(
                <div className={`${classes.root} reqPopup flex`}>
                    <div className={classes.container}>
                    <Paper elevation={3} className={classes.paper}>
                        <div className={classes.imageDiv}>
                            <Avatar className={classes.avatar} src={"https://as2.ftcdn.net/jpg/02/31/42/41/500_F_231424154_JFLnuKgqNMk7S8Yi4IGU8529hi6MtO62.jpg"}/><Avatar className={classes.avatar} src={"https://as2.ftcdn.net/jpg/02/31/42/41/500_F_231424154_JFLnuKgqNMk7S8Yi4IGU8529hi6MtO62.jpg"}/>
                        </div>
                        <Typography align="center" className={classes.name}>{userName}</Typography>
                        <Typography align="center" onClick={()=>this.getDirection(latitude,longitude)} className={classes.place}>{placeName}</Typography>
                        <Typography align="center" ><Button variant="outlined" onClick={()=>setReq(null)} className={classes.button} color="secondary">Cancrl</Button>&nbsp;&nbsp;<Button variant="outlined" className={classes.button} color="primary">Confirm</Button></Typography>
                    </Paper>
                    </div>
                </div>
            )
        }
        else return <div className="reqPopup"></div>
    }
}

var mapState = (state) =>({
    req:state.currentReq
})
var actions = {
    setReq,
}

export default connect(mapState,actions)(withStyles(styles)(Popup));