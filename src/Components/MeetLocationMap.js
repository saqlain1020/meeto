import React from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import { geolocated } from 'react-geolocated';
import { connect } from 'react-redux';
import { setLocation } from '../Redux/user/userActions'
import { v4 as uuid } from 'uuid';
import { Button, Card, CardContent, Grid, Input, Typography } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
var foursquare = require('react-foursquare')({
    clientID: 'CLC2AOG5D0D2BE42BKXUOI1B4GO0311EAN2SBN5Z123R1WKN',
    clientSecret: '0THSH3Q3GICA14DTKSMSJ4YYGDAUY5NKSIWTJABTX543MOAW'
});

class SimpleMap extends React.Component {
    state = {
        center: [0, 0],
        zoom: 14,
        draggable: true,
        lat: 45,
        lng: 41,
        venues: [],
        place: "",
        picker: "",
    };
    componentDidUpdate = (preProp) => {
        if (preProp !== this.props) {
            this.setState({
                lat: this.props.coords.latitude,
                lng: this.props.coords.longitude,
                center: [this.props.coords.latitude, this.props.coords.longitude],
            }, () => {
                let params = { "ll": `${this.state.lat},${this.state.lng}` };
                console.log(params);
                foursquare.venues.getVenues(params)
                    .then(res => {
                        this.setState({
                            venues: res.response.venues
                        })
                        console.log(res.response.venues)
                    });
            })

        }
    }
    componentDidMount = () => {

    }
    onCircleInteraction = (childKey, childProps, mouse) => {
        // function is just a stub to test callbacks
        this.setState({
            draggable: false,
            lat: mouse.lat,
            lng: mouse.lng
        }, () => {
            // this.props.setLocation({ latitude: this.state.lat, longitude: this.state.lng })
        });

        console.log('onCircleInteraction called with', childKey, childProps, mouse);
    }
    onCircleInteraction3 = (childKey, childProps, mouse) => {
        this.setState({ draggable: true });
        // function is just a stub to test callbacks  
        console.log('onCircleInteraction called with', childKey, childProps, mouse);
    }
    // _onChange = ({ center, zoom }) => {
    //     this.setState({
    //         center: center,
    //         zoom: zoom,
    //     });
    // }
    selectPlace = (place) => {
        console.log(place);
        this.setState({
            place: <Card style={{ width: "400px", height: "60px", fontSize: "20px" }}><CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography>{place.name}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" size="small" color="primary" onClick={() => this.onNext()}>Next</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" size="small" color="primary" onClick={() => this.openDirection(place.location)}>Direction</Button>
                    </Grid>
                </Grid>
            </CardContent></Card>
        })
    }
    onNext = () => {
        let obj = <Grid container style={{ background: "white", fontSize: "20px" }}>
            <Grid item xs={6}>
                <Input style={{width:"100%",padding:"12px"}} type="date"></Input></Grid>
            <Grid item xs={6}><Input style={{width:"100%",padding:"12px"}} type="time"></Input></Grid>
        </Grid>
        this.setState({
            picker: obj
        })
    }
    openDirection = (loc) => {
        window.open(`https://www.google.com/maps/dir/${loc.lat},${loc.lng}`, '_blank')
    }
    render() {
        console.log(this.props)
        return (<div style={{ width: "400px", height: "300px" }}>
            <GoogleMapReact draggable={this.state.draggable}
                onChange={this._onChange}
                center={this.state.center}
                zoom={this.state.zoom}
                // onChildMouseDown={
                //     this.onCircleInteraction}
                // onChildMouseUp={this.onCircleInteraction3}
                // onChildMouseMove={this.onCircleInteraction}
                onChildClick={() => console.log('child click')
                }
                onClick={() => console.log('mapClick')}
            >
                {this.state.venues.map(item => (
                    <RoomIcon
                        key={uuid()}
                        className="place"
                        lat={item.location.lat}
                        lng={item.location.lng}
                        style={{ color: "red" }}
                        onClick={() => this.selectPlace(item)}
                    ></RoomIcon>
                ))}
            </GoogleMapReact >
            {this.state.place}
            {this.state.picker}
        </div>
        );
    }
}

var actions = {

}

export default connect(null, actions)(geolocated()(SimpleMap));
