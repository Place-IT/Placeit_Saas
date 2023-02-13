import React, {Component, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {
    selectLogin,
    selectStatus,
    selectError,
    SuccessSelector,
    BasicDetailsU
} from "../../../features/UserAuth/AuthSlicer"

import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {Emailsend} from "../../../features/UserAuth/emailsend";
    import {logdata} from "../../../CommonFunctions/Logger/Logevents";



export default function Email_verification(props)
{
    const [state,setState]=useState(
        {
        Basic_checkup:false,
        })

    const dispatch = useDispatch();
    const Basic_user = useSelector(BasicDetailsU);
    function sendmail()
    {
        logdata("Email_verification","info",`email dispatched with data:${{email:Basic_user.email}}`)
        dispatch(Emailsend({email:Basic_user.email}))
    }
    if(Basic_user.email_verified !== undefined && Basic_user.email_verified === false && state.Basic_checkup === false )
    {
        setState({Basic_checkup: true})
        sendmail()
    }

    return (<>
        <UpperHoc  redirect="/auth/profile/" Re={false} Status={selectStatus} Error={selectError} Success={SuccessSelector}>
            {Basic_user.email_verified?<>
                <div
                    className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-xl mx-auto text-center">
                        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                            <div className="h-2 bg-indigo-700 rounded-t-md"></div>
                            <div className="py-6 px-8">
                                <span className="text-2xl font-light">{Basic_user.email} already verified</span>

                            </div>
                        </div>
                    </div>
                </div>
            </>:<>
                <div
                    className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-xl mx-auto text-center">
                        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                            <div className="h-2 bg-indigo-700 rounded-t-md"></div>
                            <div className="py-6 px-8">
                                <span className="text-2xl font-light">verification email sent on {Basic_user.email} </span>
                                <div className="flex justify-between items-baseline">
                                    <p >
                                        <p>havent recived mail yet?<a className="text-indigo-700" onClick={ev=>{
                                            ev.preventDefault()
                                            sendmail()
                                        }} href="#">resend_email</a></p>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>}
        </UpperHoc>
   </>);

}

