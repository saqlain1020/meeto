import {
  Avatar,
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
  withStyles,
  Divider
} from "@material-ui/core";
import {v4 as uuid} from 'uuid'
import React from "react";
import ProfileStepper from "./ProfileStepper";
import firebase from "../Util/Firebase";
import { connect } from "react-redux";
import { getRequests } from "./../Redux/requests/requestsActions";
import { changeStatus } from './../Redux/requests/requestsActions';

var styles = (theme) => ({
  stepper: {
    width: "500px",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
  },
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontFamily: "'Roboto Slab', serif",
    fontSize: "40px",
    fontWeight: "bolder",
    marginBottom: "10px",
  },
  row: {
    margin: "10px 0",
  },
  select:{
    fontSize: "12px",
  },
  date:{
    fontSize: "15px",
  },
});

class Dashboard extends React.Component {
  state = {
    userInfoExists: false,
  };
  componentDidUpdate = async (preProp) => {
    if (preProp !== this.props) {
      if (!this.state.userInfoExists && this.props.user.uid) {
        let query = await firebase
          .firestore()
          .collection("users")
          .doc(this.props.user.uid)
          .get();
        let user = query.data();
        if (
          user.beverages &&
          user.duration &&
          user.nickname &&
          user.phoneNumber &&
          user.images &&
          user.location
        ) {
          this.setState({
            userInfoExists: true,
          });
        } else {
          this.setState({
            userInfoExists: false,
          });
        }
      }
    }
  };
  componentDidMount = async () => {
    let {user} = this.props;
    if (
      user.beverages &&
      user.duration &&
      user.nickname &&
      user.phoneNumber &&
      user.images &&
      user.location
    ) {
      this.setState({
        userInfoExists: true,
      });
    }
    this.props.getRequests();
  };
  changeStatus = (id,value)=>{
    this.props.changeStatus(id,value);
  }
  render = () => {
    const { classes } = this.props;
    return (
      <div className={`${classes.wrapper} bg`}>
        <div className={`${classes.stepper}`}>
          {!this.state.userInfoExists && <ProfileStepper />}
          {this.state.userInfoExists && this.props.requests.length <= 0 && (
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>You Haven't Done any meeting yet</h2>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.props.history.push("MeetingDashboard");
                }}
              >
                Start A Meeting
              </Button>
            </div>
          )}
          {console.log(this.props.requests.length)}
          {this.state.userInfoExists && this.props.requests.length > 0 && (
            <div>
              <Typography className={classes.heading} variant="h1">
                All Meetings
              </Typography>
              {this.props.pendingRequests.map((user) => (
                <Grid key={uuid()} container className={classes.row} alignItems="center">
                  <Grid item xs={1}>
                    <Avatar src={`${user.images[0]}`} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align="center"><b>{user.userName}</b></Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Select variant="outlined" className={classes.select} onChange={(e)=>this.changeStatus(user.docId,e.target.value)} value={user.status}>
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                      <MenuItem value="ACCEPTED">ACCEPTED</MenuItem>
                      <MenuItem value="COMPLICATED">COMPLICATED</MenuItem>
                      <MenuItem value="DONE">DONE</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.date} align="center">{user.date}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps/dir/${user.location.latitude},${user.location.longitude}`,
                          "_blank"
                        );
                      }}
                      color="secondary"
                    >
                      Location
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Divider />
              {this.props.acceptedRequests.map((user) => (
                <Grid key={uuid()} container className={classes.row} alignItems="center">
                  <Grid item xs={1}>
                    <Avatar src={`${user.images[0]}`} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align="center"><b>{user.userName}</b></Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Select variant="outlined" className={classes.select} onChange={(e)=>this.changeStatus(user.docId,e.target.value)} value={user.status}>
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                      <MenuItem value="ACCEPTED">ACCEPTED</MenuItem>
                      <MenuItem value="COMPLICATED">COMPLICATED</MenuItem>
                      <MenuItem value="DONE">DONE</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={classes.date} align="center">{user.date}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps/dir/${user.location.latitude},${user.location.longitude}`,
                          "_blank"
                        );
                      }}
                      color="secondary"
                    >
                      Location
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </div>
          )}
        
        </div>
      </div>
    );
  };
}

var mapState = (state) => ({
  user: state.user,
  requests: state.requests,
  pendingRequests: state.requests.filter(item=>item.status==="PENDING"),
  acceptedRequests: state.requests.filter(item=>item.status!=="PENDING"),
});

var actions = {
  getRequests,
  changeStatus,
};

export default connect(mapState, actions)(withStyles(styles)(Dashboard));
