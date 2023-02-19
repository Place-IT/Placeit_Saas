import React, {Component, useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import Timeline_master_component from "../../timeline/Timeline_master";
import ErrorBoundary from "../../../CommonFunctions/Error_controlReact/ErrorBoundary";
import {Route} from "react-router-dom";




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
            </div>
            <div className="row-span-3 lg:col-span-3 col-span-5 rounded-2xl    lg:h-screen   sm:-mt-32 md:mt-0   lg:-mt-32 -mt-52  ">
                <ErrorBoundary component_name={"Timeline_master_component"}>
                    <Timeline_master_component Dashboard/>
                </ErrorBoundary>
            </div>

        </>

    );

}