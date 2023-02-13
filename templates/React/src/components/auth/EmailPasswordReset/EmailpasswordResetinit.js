import React, {useEffect, useState} from "react";
import {PasswordResetPost} from "../../../features/UserAuth/PasswordReset/PasswordResetPost";
import {useDispatch, useSelector} from "react-redux";
import {
    selectStatus,
    selectError,
    SuccessSelector
} from "../../../features/UserAuth/AuthSlicer";
import UForm from "../../../CommonFunctions/UniversalForm/Uform"
import InputCreator from "../../../CommonFunctions/UniversalForm/custominput"
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {Link} from "react-router-dom";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";


export default function PasswordResentInit(props)
{
    const [state,setState]=useState({
        email:"",
        })
    const [mode,setMode]=useState(false)

    useEffect(() => {
        logdata("PasswordResentInit","init",`initiated with following props:${props} `)
    });

    function dispatch_function()
    {
        logdata("PasswordResentInit","info",`dispatch with state:${state}`)
        dispatch(PasswordResetPost(state))
        setMode(true)
    }

    const dispatch = useDispatch();
    const Success = useSelector(SuccessSelector);
    const Error = useSelector(selectError);


        return (
            <>
             <UpperHoc redirect="/conform/"  Re={false} mode={mode}  setMode= {setMode} Status={selectStatus} Error={selectError} Success={SuccessSelector}
                       modeelements={<div
                 className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
                 <div className="relative py-3 sm:max-w-xl mx-auto text-center">
                     <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                         <div className="h-2 bg-indigo-700 rounded-t-md"></div>
                         <div className="py-6 px-8">
                             {Success.Success === true && Error.error === false &&<><span className="text-2xl font-light">paswword reset link sent succesfuuly on {state.email}</span></>}

                         </div>
                     </div>
                 </div>
             </div>
             }>
                 {mode === false &&
                 <UForm actionText="Send Reset Email"
                        Error={selectError}
                        Dispatch={undefined} state={state}
                        heading="Forgot Password"
                        Success={dispatch_function}
                        p={<>
                            <p >
                                <a href="/auth/signup/" className="text-indigo-700" ><Link to="/auth/signup/"  >Sign up</Link></a>
                            </p>
                            <p >
                                <a href="/auth/signup/" className="text-indigo-700" ><Link to="/auth/login/"  >login</Link></a>
                            </p>
                        </>}
                 >
                     <InputCreator key="email" input={{ type:"email",
                         state: state,
                         setState: setState,
                         labelText:"Email address",
                         name:"email" }
                     } />
                 </UForm>
                 }
            </UpperHoc>
            </>
        );

}

