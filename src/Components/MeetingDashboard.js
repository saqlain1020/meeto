import { Button, Card, CardContent, Modal, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers,setUsers } from '../Redux/similarUsers/similarUsersActions'
import firebase from '../Util/Firebase'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AwesomeSlider from 'react-awesome-slider';
import swal from 'sweetalert2';
import { v4 as uuid } from 'uuid'
import 'react-awesome-slider/dist/styles.css';
import MeetLocationMap from './MeetLocationMap';

const styles = (theme) => ({
    wrapper: {
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "minmax(10px,1fr) minmax(min-content,1100px) minmax(10px,1fr)",
        gridTemplateRows: "minmax(10px,1fr) minmax(400px,min-content) minmax(10px,1fr)",
        paddingLeft: "70px"
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
        color: "#222"
    },
    para: {
        color: "#636e72"
    },
    cardContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 350px 1fr",
    },
    card: {
        '&>div>h1': {
            textAlign: "center"
        }
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
    }
})

class MeetingDashboard extends Component {

    state = {
        simUsers: [],
        mapOpen: false,
        userSelected: "",
    }

    componentDidMount = async () => {
        console.log("Mounted")
        // await this.props.getUsers();
        this.userSimInit();
    }


    getDistance = (location1, location2) => {
        const R = 6371e3; // metres
        const φ1 = location1.latitude * Math.PI / 180; // φ, λ in radians
        const φ2 = location2.latitude * Math.PI / 180;
        const Δφ = (location2.latitude - location1.latitude) * Math.PI / 180;
        const Δλ = (location2.longitude - location2.longitude) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // in metres
        return Math.abs(d / 1000) //in km
    }

    componentDidUpdate = (prevProps, preState) => {
        // if (preState.simUsers !== this.props.similarUsers || prevProps.user !== this.props.user) {
        //     // this.props.getUsers();
        //     this.setState({
        //         simUsers: this.props.similarUsers
        //     })
        // }
        // if (prevProps !== this.props)
        //     this.userSimInit();
    }

    userSimInit = async () => {
        const uid = this.props.user.uid;
        let query = await firebase.firestore().collection("users").doc(uid).get();
        let data = query.data();
        let { beverages, duration, location } = data;
        let arr = [];
        query = await firebase.firestore().collection("users").get();
        query.forEach(async (doc) => {
            let user = doc.data();
            user.images = [];

            var storageRef = firebase.storage().ref(`Images/${doc.id}`);
            await storageRef.listAll().then(function (result) {
                result.items.forEach(async function (imageRef) {
                    await imageRef.getDownloadURL().then(function (url) {
                        user.images.push(url)
                    }).catch(function (error) {
                        console.log(error)
                    });
                });
            }).catch(function (error) {
                console.log(error)
            });
            if (!user || !beverages || !duration)
                return
            let bevF = beverages.some(r => user.beverages.includes(r));
            let duF = duration.some(r => user.duration.includes(r));
            console.log(user)
            if (this.getDistance(user.location, location) <= 5 && bevF && duF && user.uid !== this.props.user.uid) {
                arr.push(user);
            }
        })
        this.setState({
            simUsers: arr
        },()=>{
            this.props.setUsers(arr);
        })
    }

    removeUser = (uid) => {
        this.setState({
            simUsers: this.state.simUsers.filter(item => item.uid !== uid)
        })
    }

    showPopup = async (uid, name) => {
        let ans = await swal.fire({
            title: "Are you sure?",
            text: `You want to meet ${name}?`,
            icon: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        })
        console.log(ans.value);
        if (ans.value) {
            this.setState({
                mapOpen: !this.state.mapOpen,
                userSelected: this.state.simUsers[0].uid,
            })
        }
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.simUsers);
        return (
            <div className={`bg ${classes.wrapper}`} >
                <div className={classes.container}>
                    <h1 className={classes.mainHeading}>Meeting Dashboard</h1>
                    <h3 className={classes.para}>Select User from the given list of users to meet.</h3>
                    <div className={classes.cardContainer}>
                        {this.state.simUsers[0] && <Card style={{ gridArea: "1/2" }} key={uuid()}>
                            <CardContent className={classes.card}>
                                <AwesomeSlider bullets={false}>
                                    {this.state.simUsers[0].images.map(img => (<div data-src={img} />))}
                                </AwesomeSlider>
                                <div className={classes.cardOptions}>
                                    <CheckCircleIcon className={classes.tick} onClick={() => this.showPopup(this.state.simUsers[0].uid, this.state.simUsers[0].nickname)} /><h1>{this.state.simUsers[0].nickname}</h1><CancelIcon className={classes.cross} onClick={() => this.removeUser(this.state.simUsers[0].uid)} />
                                </div>
                            </CardContent>
                        </Card>}
                    </div>
                    <Button onClick={() => this.setState({ a: 1 })}>rerender</Button>
                    <Modal
                        // style={{ width: "300px", height: "300px" }}
                        open={this.state.mapOpen}
                        onClose={() => this.setState({ mapOpen: false })}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >

                        <div style={{ width: "400px", height: "400px" }}>
                            <MeetLocationMap userName={this.state.user.nickname} userSelected={this.state.userSelected} />
                        </div>

                    </Modal>
                </div>
            </div>
        );
    }
}

var mapState = (state) => ({
    user: state.user,
    similarUsers: state.similarUsers
})

var actions = {
    getUsers,
    setUsers,
}

export default connect(mapState, actions)(withStyles(styles)(MeetingDashboard));
