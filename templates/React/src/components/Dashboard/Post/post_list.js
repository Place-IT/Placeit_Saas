import React, {Component, useEffect, useState} from "react";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import Timeline_master_component from "../../timeline/Timeline_master";
import ErrorBoundary from "../../../CommonFunctions/Error_controlReact/ErrorBoundary";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {store} from "../../../app/store";
import {DialogSlice} from "../../../features/dialogSlicer";
import {Link} from "react-router-dom";




export default function  Post_list(props)  {
    useEffect(()=>{
        logdata("Post_list","init",`Post_list init with following props:${props}`)
    },[])


    return (
        <>
            <div className="row-span-1 lg:col-span-3 col-span-5">
                <div className="flex justify-center">
                    <div
                        className="px-5 max-w-fit border-b-4 lg:text-4xl text-2xl border-indigo-700 font-bold">
                        Post DashBoard
                    </div>
                </div>
                <a href={`/dashboard/post_Create/`}>
                    <div className="flex flex-row justify-between my-8 ">
                        <div className="hidden md:flex flex-row bg-indigo-600 rounded-full px-4 py-2 cursor-pointer"  >
                            <i className='bx bx-plus-circle text-white text-2xl'></i>
                            <p className="text-lg text-white px-2 font-bold">New post</p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="row-span-3 lg:col-span-3 col-span-5 rounded-2xl lg:h-screen  md:mt-0 -mt-28  ">
                <ErrorBoundary component_name={"Timeline_master_component"}>
                    <Timeline_master_component Dashboard/>
                </ErrorBoundary>
            </div>
            <div className="md:hidden" >
                <Link to={`/dashboard/post_Create/`}>
                <Fab color="primary" aria-label="add" style={{
                    margin: 0,
                    top: 'auto',
                    right: 10,
                    bottom: 70,
                    left: 'auto',
                    position: 'fixed',
                }}
                >
                    <AddIcon />
                </Fab>
                </Link>
            </div>

        </>
    );

}