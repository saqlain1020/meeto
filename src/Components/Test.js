    import React from 'react';
    import GoogleMapReact from 'google-map-react';
    import RoomIcon from '@material-ui/icons/Room';
    import { geolocated } from 'react-geolocated';
    import { connect } from 'react-redux';
    import {setLocation} from '../Redux/user/userActions'

    class SimpleMap extends React.Component {
        state = {
            center: [0, 0],
            zoom: 9,
            draggable: true,
            lat: 45,
            lng: 41
        };
        componentDidUpdate = (preProp) => {
            if (preProp !== this.props) {
                this.setState({
                    lat: this.props.coords.latitude,
                    lng: this.props.coords.longitude,
                    center: [this.props.coords.latitude, this.props.coords.longitude],
                },()=>{
                    this.props.setLocation({latitude:this.state.lat,longitude:this.state.lng})
                })
            }
        }
        // componentDidMount = ()=>{
        //     console.log(this.props)
        //     this.setState({
        //         lat: this.props.coords.latitude,
        //         lng: this.props.coords.longitude
        //     })
        // }
        onCircleInteraction = (childKey, childProps, mouse) => {
            // function is just a stub to test callbacks
            this.setState({
                draggable: false,
                lat: mouse.lat,
                lng: mouse.lng
            },()=>{
                this.props.setLocation({latitude:this.state.lat,longitude:this.state.lng})
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

        render() {
            console.log(this.props)
            return (
                <GoogleMapReact draggable={this.state.draggable}
                    onChange={this._onChange}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    onChildMouseDown={
                        this.onCircleInteraction}
                    onChildMouseUp={this.onCircleInteraction3}
                    onChildMouseMove={this.onCircleInteraction}
                    onChildClick={() => console.log('child click')
                    }
                    onClick={() => console.log('mapClick')}
                >
                    <RoomIcon
                        className="place"
                        lat={this.state.lat}
                        lng={this.state.lng}
                        style={{ color: "red" }}
                    ></RoomIcon>
                </GoogleMapReact >
            );
        }
    }

    var actions={
        setLocation,
    }

    export default connect(null,actions)(geolocated()(SimpleMap));
