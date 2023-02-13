import React, { Component } from "react";
import Box from '@mui/material/Box';




export default class MaterialFotter extends Component
{
    constructor(props) {
        super(props);
        this.state={};
    }

    render() {


        return (
            <>
                <Box
            sx={{
                 width: 1 ,
                height:400,
                backgroundColor: 'primary.dark',
              }}
            >
            
            hello nimish
            
            </Box>
            </>

        );
    }
}