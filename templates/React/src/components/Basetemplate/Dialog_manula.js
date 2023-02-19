import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, TextField,
    useMediaQuery
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {useSelector} from "react-redux";
import {DialogSlice, selectState} from "../../features/dialogSlicer";
import {store} from "../../app/store";
import {logdata} from "../../CommonFunctions/Logger/Logevents";

export default function DialogManual(props)
{
    useEffect(ev=>{
        logdata("DialogManual","init",`DialogManual initated with following props ${props}`)
    },[])

    const Dialog_state = useSelector(selectState);
    const Error = useSelector(props.Error);
    const Success = useSelector(props.Success);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        logdata("handleClose","init",`Dialog closing`)
        store.dispatch(DialogSlice.actions.dialogState())
        logdata("handleClose","Completed",`Dialog closing`)

    };

    if(Success.Success)
    {
        handleClose()
    }

    return<>
    <Dialog
        fullScreen={fullScreen}
        open={Dialog_state}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">

        <DialogTitle id="responsive-dialog-title">
            {props.tittle}
        </DialogTitle>

        <DialogContent>
            <DialogContentText>
                {props.Content}
            </DialogContentText>
            {props.children}
            <br/>
            <br/>
            <DialogContentText>
            {Error.error &&  <p className="text-center text-red-700">{Error.error_msg}</p>}
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <Button  onClick={handleClose}>
                Disagree
            </Button>
            <Button onClick={props.dispatch_function}>
                Agree
            </Button>
        </DialogActions>

    </Dialog>
</>
}