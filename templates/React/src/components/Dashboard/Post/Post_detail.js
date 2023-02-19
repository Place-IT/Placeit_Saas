import React, {Component, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";




export default function  PostDetail(props)  {
    useEffect(()=>{
        logdata("Post_Detail","init",`Post_Detail init with following props:${props}`)
    },[])
    return (
        <>
            <div>
                <div className="m-4 lg:m-10 ">

                    <div className="flex m-4  text-md justify-between">
                        <Link to={`/dashboard/post_list/`}>
                            <div className="flex  flex-row  rounded-full py-2 cursor-pointer" >
                                <p href="#" className=""><i className='bx bxs-chevron-left  lg:text-3xl'></i></p>
                                <p className="lg:text-2xl px-2 border-b-4 border-indigo-800">Back</p>
                            </div>
                        </Link>
                        <div className="hidden md:flex flex-row  bg-indigo-600 rounded-full px-4 py-2 cursor-pointer">
                            <p href="#" className="px-2"><i className='bx bx-plus-circle text-white text-3xl'></i></p>
                            <p className="text-2xl text-white px-2 font-bold">Edit Post</p>
                        </div>
                    </div>

                    <div className=" border-2  relative space-y-3 md:space-y-0  rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto bg-gray-200">
                    </div>
                </div>
                    </div>
        </>

    );

}

