import {useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import Alert from '@mui/lab/Alert';
import React from "react";
import Backdrop from '@mui/material/Backdrop';
import {CircularProgress, Snackbar} from "@mui/material";
import {logdata} from "../Logger/Logevents";

 function CustomizedSnackbars(props) {

    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}  key={"bottom" + "center"}>
                <Alert variant="filled" onClose={handleClose}  sx={{ width: '100%' }} severity={props.severity}>
                    {`${props.message}`}
                </Alert>
            </Snackbar>
        </>
    );
}

// {sectional = true for only sectional
// Success
//Error
//showSuccess :false if u dont want it or leave it undefined
//hard: false if nundefinde 
//redirect: link
//Re true if you want to redirect
// }


export default function UpperHoc (props)
{
    let history = useHistory();
    const status = useSelector(props.Status);
    const Error = useSelector(props.Error);
    const Success = useSelector(props.Success);
    logdata("UpperHoc","init",`initiated with following props:${props} status:${status} Error:${Error} Success:${Success}`)




    if(props.mode === true && Error.error ===true)
    {
        if(props.setMode === undefined)
        {
            return <>"mode not defined"</>
        }
        else
        {
            props.setMode(false)
        }
    }
    // console.log(props.Re === false && Success.Success === true && props.mode === true,props.Re === false ,Success.Success === true , props.mode === true)
    // console.log(props.Re === true && Success.Success === true && (window.location.href.search("next") === -1) === false,props.Re === true , Success.Success === true , (window.location.href.search("next") === -1))

    if (status ==="loading")
    {
        if(props.sectional=== true)
        {
            return <>
                <div style={{"display":"flex","align-items":"center",justifyContent:"center"}}>
                    <CircularProgress color="success" />
                </div>
            </>
        }

        return<>
            <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                    >
                    <CircularProgress color="success" />
            </Backdrop>
        </>
    }
    else{
        return <>
            {Success.Success === false && Error.error === false &&<></>}
            {Success.Success === false && Error.error === true &&<><CustomizedSnackbars message={`${Error.error_msg}`}  severity="error" /></>}
            {props.showSuccess === undefined && Success.Success === true && Error.error === false &&<><CustomizedSnackbars message={`${Success.Success_msg}`}  severity="success" /></>}
            {props.Re === true && Success.Success === true && <>
                    {
                        (()=>{
                            let redirectTo=null
                            if ((window.location.href.search("next") === -1)=== false)
                            {
                                redirectTo=window.location.href.split("next=")[1]
                            }
                            else{
                                redirectTo=props.redirect
                            }

                            if( props.hard === true)
                            {
                                logdata("UpperHoc","completed",`hard redirtected redirectTo:${redirectTo}`)
                                console.log(setTimeout(ev=>{window.location.href=redirectTo},2000))
                            }
                            else
                            {
                                setTimeout(ev=>{history.push(redirectTo);},2000)
                            }
                        })()
                    }

                </>}

            {props.Re === false && Success.Success === true && props.mode === true &&
            <>
                {props.modeelements}
            </>
            }
            {props.children}

        </>


    }
}