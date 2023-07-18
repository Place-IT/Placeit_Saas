import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Alert from "@mui/lab/Alert";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress, Snackbar } from "@mui/material";
import { logdata } from "../Logger/Logevents";

/**
 * Customized snack bar component.
 * @param {Object} props - Component props.
 * @returns {JSX.Element} - Customized snack bar component.
 */
function CustomizedSnackbars(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} key={"bottom" + "center"}>
                <Alert variant="filled" onClose={handleClose} sx={{ width: "100%" }} severity={props.severity}>
                    {`${props.message}`}
                </Alert>
            </Snackbar>
        </>
    );
}

/**
 * Higher-order component for handling status, success, and error states.
 * @param {Object} props - Component props.
 * @returns {JSX.Element} - UpperHoc component.
 */
export default function UpperHoc(props) {
    let history = useHistory();
    const status = useSelector(props.Status);
    const Error = useSelector(props.Error);
    const Success = useSelector(props.Success);

    if (props.mode === true && Error.error === true) {
        if (props.setMode === undefined) {
            return <>mode not defined</>;
        } else {
            props.setMode(false);
        }
    }

    if (status === "loading") {
        if (props.sectional === true) {
            return (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress color="success" />
                </div>
            );
        }

        return (
            <>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="success" />
                </Backdrop>
            </>
        );
    } else {
        return (
            <>
                {Success.Success === false && Error.error === false && <></>}
                {Success.Success === false && Error.error === true && (
                    <CustomizedSnackbars message={`${Error.error_msg}`} severity="error" />
                )}
                {props.showSuccess === undefined && Success.Success === true && Error.error === false && (
                    <CustomizedSnackbars message={`${Success.Success_msg}`} severity="success" />
                )}
                {props.Re === true && Success.Success === true && (
                    <>
                        {(() => {
                            let redirectTo = null;
                            if (window.location.href.search("next=") !== -1) {
                                redirectTo = window.location.href.split("next=")[1];
                            } else {
                                redirectTo = props.redirect;
                            }

                            if (props.hard === true) {
                                logdata("UpperHoc", "completed", `hard redirected redirectTo:${redirectTo}`);
                                console.log(setTimeout((ev) => {
                                    window.location.href = redirectTo;
                                }, 2000));
                            } else {
                                setTimeout((ev) => {
                                    history.push(redirectTo);
                                }, 2000);
                            }
                        })()}
                    </>
                )}
                {props.Re === false && Success.Success === true && props.mode === true && <>{props.modeelements}</>}
                {props.children}
            </>
        );
    }
}
