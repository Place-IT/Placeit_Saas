import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logdata} from "../Logger/Logevents";

export default function UForm(props)
{
    const dispatch = useDispatch();
    const Error = useSelector(props.Error);
    const propsDispatchthink=(props)=>{
        logdata("propsDispatchthink","success",`dispatch the function with data ${props.daemon}`)
        dispatch(props.Dispatch(props.state))
    }

    if (props.Dispatch === undefined && props.Success === undefined)
    {
        logdata("propsDispatchthink","error",`set atleast Dispatch or onSuccess`)

        return <div>
            set atleast Dispatch or onSuccess
        </div>
    }
    if (props.Dispatch !== undefined && props.Success !== undefined)
    {
        logdata("propsDispatchthink","error",`only one of both  Dispatch or onSuccess should be defined`)
        return <div>
            only one of both  Dispatch or onSuccess should be defined
        </div>
    }
    return (
            <>
                <div
                    className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-xl mx-auto text-center">
                        <span className="text-2xl font-light">{props.heading}</span>
                        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                            <div className="h-2 bg-indigo-700 rounded-t-md"></div>
                            <div className="py-6 px-8">
                                {props.children}

                                {Error.error &&  <p className="text-center text-red-700">{Error.error_msg}</p>}
                                <div className="flex justify-between items-baseline">
                                    <a className="mt-4 border-2 border-indigo-700 w-full hover:bg-indigo-700 text-center text-indigo-700 hover:text-white py-2 px-6 rounded-lg"
                                       onClick={ev=>{
                                           if(props.Dispatch !== undefined)
                                           {
                                               propsDispatchthink(props)
                                           }else
                                           {
                                               props.Success(props)
                                           }
                                       }}
                                    >{props.actionText}</a>
                                </div>
                                {props.p}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

}