import { Button, Card, CardContent, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../Redux/similarUsers/similarUsersActions'
import firebase from '../Util/Firebase'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AwesomeSlider from 'react-awesome-slider';
import { v4 as uuid } from 'uuid'
import 'react-awesome-slider/dist/styles.css';
// import AwsSliderStyles from 'react-awesome-slider/src/styles';

const styles = (theme) => ({
    wrapper: {
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "minmax(10px,1fr) minmax(min-content,1100px) minmax(10px,1fr)",
        gridTemplateRows: "minmax(10px,1fr) minmax(400px,min-content) minmax(10px,1fr)",
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
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    },
    card: {
        // height: "300px",
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
    render() {
        const { classes } = this.props;
        return (
            <div className={`bg ${classes.wrapper}`}>
                <div className={classes.container}>
                    <h1 className={classes.mainHeading}>Meeting Dashboard</h1>
                    <h3 className={classes.para}>Select User from the given list of users to meet.</h3>
                    <div className={classes.cardContainer}>
                        {this.props.similarUsers.map(user => (
                            <Card key={uuid()}>
                                <CardContent className={classes.card}>
                                    {console.log(user.images)}
                                    <AwesomeSlider bullets={false}>
                                        {user.images.map(img=>(<div data-src={img}/>))}
                                    </AwesomeSlider>
                                    <div className={classes.cardOptions}>
                                        <CheckCircleIcon className={classes.tick} /><h1>{user.nickname}</h1><CancelIcon className={classes.cross} />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button onClick={()=>this.setState({a:1})}>rerender</Button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate = (preProp) => {
        if (preProp.user !== this.props.user) {
            this.props.getUsers();
        }
    }
}

var mapState = (state) => ({
    user: state.user,
    similarUsers: state.similarUsers
})

var actions = {
    getUsers,
}

export default connect(mapState, actions)(withStyles(styles)(MeetingDashboard));
