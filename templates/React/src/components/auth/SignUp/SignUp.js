import React, {Component, useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {
    selectLogin,
    selectStatus,
    selectError, SuccessSelector,
} from "../../../features/UserAuth/AuthSlicer";
import {Signup} from "../../../features/UserAuth/Signup";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import UForm from "../../../CommonFunctions/UniversalForm/Uform";
import {Link} from "react-router-dom";
import InputCreator from "../../../CommonFunctions/UniversalForm/custominput";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";



export default function SignUp(props)
{
    const [state,setState]=useState({
        email:"",
        password:"",
        re_password:"",
    })

    useEffect(() => {
        logdata("Signup","init",`initiated with following props:${props}`)
    });
    return (
        <>
            <UpperHoc hard={true} redirect="/auth/emailverifysent/" Re={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <UForm Error={selectError} actionText="Signup"
                       Dispatch={Signup} state={state}
                       heading="Sign Up with your email"
                       p={<>
                           <p>
                               Already have an account? <a href="/auth/login/" className="text-indigo-700" ><Link to="/auth/login/"  >Log in</Link></a>
                           </p>
                       </>}
                >
                    <InputCreator key="email" input={{ type:"email",
                        state: state,
                        setState: setState,
                        labelText:"Email address",
                        name:"email" }

                    } />
                    <InputCreator  key="password" input={{ type:"password",
                        state: state,
                        setState: setState,
                        labelText:"Password",
                        name:"password" }
                    }/>
                    <InputCreator  key="Re-type Password" input={{ type:"password",
                        state: state,
                        setState: setState,
                        labelText:"Re-type Password",
                        name:"re_password" }
                    }/>
                </UForm>
            </UpperHoc>
        </>
    );

}