import React, {Component, useState} from "react";
import {LoginThunk} from "../../../features/UserAuth/Login";
import {useDispatch,useSelector} from "react-redux";
import {
    // selectLogin,
    selectStatus,
    selectError,
    SuccessSelector
} from "../../../features/UserAuth/AuthSlicer";
import Formcss  from "../../CommonCss/form.module.css";
import UpperHoc from "../../CommonFunctions/CustomHoc";
import { Link } from 'react-router-dom'
import UForm from "../../../CommonFunctions/UniversalForm/Uform"
import InputCreator from "../../../CommonFunctions/UniversalForm/custominput"


export default function Login(props)
{
    const [state,setState]=useState({
        email:"",
        password:""

    })
    const dispatch = useDispatch();
    // const Login_state = useSelector(selectLogin);
    // const status = useSelector(selectStatus);
    // const Error = useSelector(selectError);
    // Login_state,status,Error,
    // console.log(state)
        return (
            <>
             <UpperHoc redirect="/auth/profile/" Re={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <section className={Formcss["form-section"]} style={{"margin-top": "50px"}}>
                
                        <UForm Dispatch={LoginThunk} state={state}
                         heading="Sign in with your email"
                         p={<p className={Formcss["form-caption"]}>
                         Don't have an account? <a href="/auth/signup/"  ><Link to="/auth/signup/" >Sign up</Link></a>
                        </p>}
                         >
                         
                        <InputCreator input={{ type:"email",
                                            state: state,
                                            setState: setState,
                                            labelText:"Email address",
                                        name:"email" }
                                            } />
                        <InputCreator input={{ type:"password",
                                            state: state,
                                            setState: setState,
                                            labelText:"Password",
                                            name:"password" }
                                            }/>
    

                        </UForm>                
                    </section>
            </UpperHoc>                  
            </>
        );

}

