import React from "react";
import Backdrop from "@mui/material/Backdrop";
import {CircularProgress} from "@mui/material";


export default function  Profile ()  {
        return (
            <>
                {console.log("profile reload",window.location.reload())}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}

                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>

        );

}