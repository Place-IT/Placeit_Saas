import React, {Component, useEffect, useState} from "react";
import {LoginThunk} from "../../../features/UserAuth/Login";
import {useDispatch,useSelector} from "react-redux";
import {
    selectStatus,
    selectError,
    SuccessSelector, selectLogin
} from "../../../features/UserAuth/AuthSlicer";
import UForm from "../../../CommonFunctions/UniversalForm/Uform";
import InputCreator from "../../../CommonFunctions/UniversalForm/custominput";
import {Link} from "react-router-dom";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";


export default function Login(props)
{
    const [state,setState]=useState({
        email:"",
        password:"",
    })

    useEffect(() => {
        logdata("Login","init",`initiated with following props:${props} `)
    });

        return (
            <>
             <UpperHoc  redirect="/auth/profile/" Re={true} hard={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                        <UForm
                            actionText="Login"
                            Error={selectError}
                            Dispatch={LoginThunk} state={state}
                            heading="Sign in with your email"
                            p={<>
                                 <p>
                                    Don't have an account? <a href="/auth/signup/" className="text-indigo-700" ><Link to="/auth/signup/"  >Sign up</Link></a>
                                 </p>
                                <p>
                                  <a href="/auth/signup/" className="text-indigo-700" ><Link to="/auth/forgotPassword/"  >forgot password?</Link></a>
                                </p>
                             </>}
                            >
                        <InputCreator key="email" input={
                                            {type:"email",
                                            state: state,
                                            setState: setState,
                                            labelText:"Email address",
                                            name:"email" }
                                            } />
                        <InputCreator  key="password" input={
                                            {type:"password",
                                            state: state,
                                            setState: setState,
                                            labelText:"Password",
                                            name:"password" }
                                            }/>
                        </UForm>
            </UpperHoc>
            </>
        );

}

