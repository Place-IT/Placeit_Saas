import React, {Component, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {
    selectStatus,
    selectError,
    SuccessSelector,
    BasicDetailsU
} from "../../../features/UserAuth/AuthSlicer"
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {emailverifyConform} from "../../../features/UserAuth/emailverifyConform";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";



export default function Email_verification_conform(props)
{
    const token=window.location.search.substring(window.location.search.indexOf('=')+1,window.location.search.length)
    const [state,setState]=useState(
        {
            Basic_checkup:false,
            token_err:token === ""

        })
    const dispatch = useDispatch();
    const Basic_user = useSelector(BasicDetailsU);
    const selectError_ = useSelector(selectError);


    function sendmail()
    {
        logdata("Email_verification_conform","info",`email dispatched with data:${{token:token}}`)
        dispatch(emailverifyConform({token:token}))
    }

    if(Basic_user.email_verified !== undefined && Basic_user.email_verified === false && state.Basic_checkup === false )
    {
        logdata("Email_verification_conform","info",`Condtion check${Basic_user.email_verified !== undefined && Basic_user.email_verified === false && state.Basic_checkup === false,Basic_user.email_verified !== undefined , Basic_user.email_verified === false , state.Basic_checkup === false,Basic_user.email_verified , Basic_user.email_verified, state.Basic_checkup }`)
        setState({Basic_checkup: true})
        sendmail()
    }

    return (<>
        <UpperHoc  redirect="/auth/profile/" Re={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>
            {Basic_user.email_verified?<>
                <div
                    className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-xl mx-auto text-center">
                        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                            <div className="h-2 bg-indigo-700 rounded-t-md"></div>
                            <div className="py-6 px-8">

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
                                {
                                    state.token_err || selectError_.error ?<>
                                        {selectError_.error ?<>
                                            <span className="text-2xl text-red-700 font-light">         {selectError_.error_msg}          </span>
                                        </>:<>
                                            <span className="text-2xl text-red-700 font-light">         Token-Invalid          </span>
                                        </>}
                                    </>:<>
                                        <span className="text-2xl font-light">email verification successful</span>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </UpperHoc>
    </>);

}

