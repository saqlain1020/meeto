import {
  Avatar,
  Button,
  Drawer,
  Grid,
  MenuItem,
  Select,
  Typography,
  withStyles,
} from "@material-ui/core";
import {v4 as uuid} from 'uuid'
import React from "react";
import ProfileStepper from "./ProfileStepper";
import firebase from "../Util/Firebase";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
import { getRequests } from "../Redux/requests/requestsActions";

var styles = (theme) => ({
  stepper: {
    width: "500px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
  },
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#dfe6e9",
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
          user.images
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
    this.props.getRequests();
  };
  render = () => {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.stepper}>
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
            {console.log(this.props.requests)}
            {console.log(this.props.requests.length)}
              {this.props.requests.map((user) => (
                <Grid key={uuid()} container className={classes.row} alignItems="center">
                  <Grid item xs={2}>
                      {user.images.forEach(item=>console.log(item))}
                    <Avatar src={`${user.images[0]}`} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{user.userName}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Select value={user.status}>
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                      <MenuItem value="ACCEPTED">ACCEPTED</MenuItem>
                      <MenuItem value="COMPLICATED">COMPLICATED</MenuItem>
                      <MenuItem value="DONE">DONE</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{user.date}</Typography>
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
});

var actions = {
  getRequests,
};

export default connect(mapState, actions)(withStyles(styles)(Dashboard));
