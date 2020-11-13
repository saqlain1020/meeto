import Alert from "@material-ui/lab/Alert";

var initialState = ""

var alertReducer = (state = initialState,action)=>{
    var {type,payload} = action;
    switch(type){
        case "SET_ALERT":
            let {msg,status} = payload;
            return <Alert variant="filled" style={{top:"calc(100vh - 80px)",transform:"translateX(5vw)",zIndex:"2000"}} severity={status}>{msg}</Alert>
        case "REMOVE_ALERT":
            return "";
        default:
            return state;
    }
}

export default alertReducer;