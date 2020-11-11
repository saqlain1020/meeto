import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
import GoogleMapReact from 'google-map-react';
import { geolocated } from 'react-geolocated';
import Draggable from 'react-draggable';
import RoomIcon from '@material-ui/icons/Room';
import Test from './Test';
import { connect } from 'react-redux';
import {saveProfile,uploadImages} from '../Redux/user/userActions'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Initial Setup', 'Upload Images', 'Select Props', 'Location'];
}


function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [nickname, setNickname] = React.useState("")
    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [images, setImages] = React.useState([]);
    const [beverages, setBeverages] = React.useState([]);
    const [duration, setDuration] = React.useState([]);

    const saveData = ()=>{
        let obj = {
            duration,
            beverages,
            phoneNumber,
            nickname,
        }
        props.saveProfile(obj);
        props.uploadImages(images);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onCircleInteraction3 = (childKey, childProps, mouse) => {
        // this.setState({draggable: true});
        // function is just a stub to test callbacks  
        // console.log('onCircleInteraction called with', childKey, childProps, mouse);

    }

    const handleReset = () => {
        setActiveStep(0);
        setImages([])
        setBeverages([])
        setDuration([])
    };
    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button variant="contained" color="primary" onClick={saveData}>Save Data</Button>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                )  : (
                        <div className={classes.instructions}>
                            {function () {
                                switch (activeStep) {
                                    case 0:
                                        return <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                            <TextField id="standard-basic" value={nickname} onChange={(e) => { console.log(nickname); setNickname(e.target.value) }} label="Nickname" type="text" required />
                                            <TextField id="standard-basic" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} label="Phone Number" type="tel" required />
                                        </div>;
                                    case 1:
                                        return <DropzoneArea filesLimit={3} acceptedFiles={['image/*']} v
                                            onChange={(images) => setImages(images)}
                                        />;
                                    case 2:
                                        let beveragesItems = ["Coffee", "Juice", "Cocktail"];
                                        let durationItems = ["20", "60", "120"];
                                        return <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                            <FormControl style={{ minWidth: "150px" }}>
                                                <InputLabel id="demo-mutiple-chip-label">Select Beverages</InputLabel>
                                                <Select
                                                    labelId="demo-mutiple-chip-label"
                                                    id="demo-mutiple-chip"
                                                    multiple
                                                    value={beverages}
                                                    onChange={(e) => { setBeverages(e.target.value) }}
                                                    input={<Input id="select-multiple-chip" />}
                                                    renderValue={(selected) => (
                                                        <div className={classes.chips}>
                                                            {selected.map((value) => (
                                                                <Chip key={value} label={value} className={classes.chip} />
                                                            ))}
                                                        </div>
                                                    )}
                                                >
                                                    {beveragesItems.map((name) => (
                                                        <MenuItem key={name} value={name}>
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl style={{ minWidth: "150px" }}>
                                                <InputLabel id="demo-mutiple-chip-label">Set Duration mins</InputLabel>
                                                <Select
                                                    labelId="demo-mutiple-chip-label"
                                                    id="demo-mutiple-chip"
                                                    multiple
                                                    value={duration}
                                                    onChange={(e) => { setDuration(e.target.value) }}
                                                    input={<Input id="select-multiple-chip" />}
                                                    renderValue={(selected) => (
                                                        <div className={classes.chips}>
                                                            {selected.map((value) => (
                                                                <Chip key={value} label={value} className={classes.chip} />
                                                            ))}
                                                        </div>
                                                    )}
                                                >
                                                    {durationItems.map((name) => (
                                                        <MenuItem key={name} value={name}>
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>;
                                    case 3:
                                        return <div style={{ height: '300px', width: '100%' }}>
                                            {/* <GoogleMapReact
                                                bootstrapURLKeys={{ key: "AIzaSyBRN5krCF7Uhc_-O8d4R3uggHS5iZt9-OA" }}
                                                defaultCenter={{
                                                    lat: props.coords.latitude,
                                                    lng: props.coords.longitude
                                                }}
                                                defaultZoom={11}
                                                onChildClick
                                                onChildMouseDown={onCircleInteraction}
                                                onChildMouseUp={onCircleInteraction3}
                                                onChildMouseMove={onCircleInteraction}
                                            >

                                                <RoomIcon lat={props.coords.latitude}
                                                    lng={props.coords.longitude}
                                                    text="My Location"
                                                />
                                            </GoogleMapReact> */}
                                            <Test />
                                        </div>
                                    default:
                                        return 'Unknown stepIndex';
                                }
                            }()}
                            <div style={{ marginTop: "20px" }} >
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
              </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    {/* {activeStep === steps.length - 1 && saveData()} */}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div >
    );
}

var mapState = (state) =>({
    user: state.user
})
var actions = {
    saveProfile,
    uploadImages,
}

export default connect(mapState,actions)(geolocated()(HorizontalLabelPositionBelowStepper));