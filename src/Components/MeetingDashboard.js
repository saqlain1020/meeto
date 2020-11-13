import {
  Button,
  Card,
  CardContent,
  Modal,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers, setUsers } from "../Redux/similarUsers/similarUsersActions";
import firebase from "../Util/Firebase";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import AwesomeSlider from "react-awesome-slider";
import swal from "sweetalert2";
import { v4 as uuid } from "uuid";
import "react-awesome-slider/dist/styles.css";
import MeetLocationMap from "./MeetLocationMap";

const styles = (theme) => ({
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns:
      "minmax(10px,1fr) minmax(min-content,1100px) minmax(10px,1fr)",
    gridTemplateRows:
      "minmax(10px,1fr) minmax(400px,min-content) minmax(10px,1fr)",
    // paddingLeft: "70px",
  },
  container: {
    gridArea: "2/2",
    background: "white",
    borderRadius: "10px",
    height: "100%",
    padding: "20px",
  },
  mainHeading: {
    textAlign: "center",
    color: "#222",
  },
  para: {
    color: "#636e72",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 350px 1fr",
  },
  card: {
    "&>div>h1": {
      textAlign: "center",
    },
  },
  cardOptions: {
    display: "grid",
    gridTemplateColumns: "min-content 1fr min-content",
    justifyContent: "center",
    alignItems: "center",
  },
  tick: {
    color: "green",
    fontSize: "35px",
    cursor: "pointer",
  },
  cross: {
    color: "red",
    fontSize: "35px",
    cursor: "pointer",
  },
});

class MeetingDashboard extends Component {
  state = {
    simUsers: null,
    mapOpen: false,
    userSelected: "",
  };

  componentDidMount = async () => {
    console.log("Mounted");
    this.props.getUsers();
  };

  componentDidUpdate = (prevProps, preState) => {
    if (prevProps !== this.props)
      this.setState({
        simUsers: this.props.similarUsers,
      });
      if(preState.simUsers !== this.state.simUsers){
          console.log("chnge state");
          setTimeout(()=>{
            this.setState({
                b: 1,
            })
          },1000)
          
      }
  };

  removeUser = (uid) => {
    this.setState({
      simUsers: this.state.simUsers.filter((item) => item.uid !== uid),
    });
  };

  showPopup = async (uid, name) => {
    let ans = await swal.fire({
      title: "Are you sure?",
      text: `You want to meet ${name}?`,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    console.log(ans.value);
    if (ans.value) {
      this.setState({
        mapOpen: !this.state.mapOpen,
        userSelected: this.state.simUsers[0].uid,
      });
    }
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.simUsers);
    return (
      <div className={`bg ${classes.wrapper}`}>
        <div className={classes.container}>
          <h1 className={classes.mainHeading}>Meeting Dashboard</h1>
          <h3 className={classes.para}>
            Select User from the given list of users to meet.
          </h3>
          <div className={classes.cardContainer}>

            {this.state.simUsers && this.state.simUsers[0] &&
              <Card style={{ gridArea: "1/2" }} key={uuid()}>
                <CardContent className={classes.card}>
                  <AwesomeSlider bullets={false}>
                    {this.state.simUsers[0].images.map((img) => (
                      <div key={uuid()} data-src={img} />
                    ))}
                  </AwesomeSlider>
                  <div className={classes.cardOptions}>
                    <CheckCircleIcon
                      className={classes.tick}
                      onClick={() =>
                        this.showPopup(
                          this.state.simUsers[0].uid,
                          this.state.simUsers[0].nickname
                        )
                      }
                    />
                    <h1>{this.state.simUsers[0].nickname}</h1>
                    <CancelIcon
                      className={classes.cross}
                      onClick={() =>
                        this.removeUser(this.state.simUsers[0].uid)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            }
          </div>
          <Modal
            // style={{ width: "300px", height: "300px" }}
            open={this.state.mapOpen}
            onClose={() => this.setState({ mapOpen: false })}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "400px", height: "400px" }}>
              <MeetLocationMap userSelected={this.state.userSelected} />
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

var mapState = (state) => ({
  user: state.user,
  similarUsers: state.similarUsers,
});

var actions = {
  getUsers,
  setUsers,
};

export default connect(mapState, actions)(withStyles(styles)(MeetingDashboard));
