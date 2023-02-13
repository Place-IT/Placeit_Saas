import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {selectError, selectStatus, SuccessSelector} from "../../../features/UserAuth/AuthSlicer";
import UForm from "../../../CommonFunctions/UniversalForm/Uform";
import {LoginThunk} from "../../../features/UserAuth/Login";
import {Link} from "react-router-dom";
import InputCreator from "../../../CommonFunctions/UniversalForm/custominput";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {Change_password} from "../../../features/UserAuth/ChangePassword";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";

export default function Password_update()
{
    const [state,setState]=useState({old_password:"",new_password:""})

    useEffect(() => {
        logdata("Password_update","init",`hello`)
    });


    return<>
        <UpperHoc  redirect="/auth/profile/" Re={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>

                <UForm actionText="password reset"
                       Error={selectError}
                       Dispatch={Change_password} state={state}
                       heading="Password Update"

                       p={<></>}
                >
                    <InputCreator input={{type:"password",
                        name:"old_password",
                        state: state,
                        setState: setState,
                        labelText:"old Password"
                        ,
                        withdiv:true,
                        iconElement:[
                            {"password" : <VisibilityOffOutlinedIcon />},
                            {"text" :<RemoveRedEyeOutlinedIcon />}
                        ]
                    }}/>
                    <InputCreator input={{type:"password",
                        name:"new_password",
                        state: state,
                        setState: setState,
                        labelText:"New Password"
                        ,
                        withdiv:true,
                        iconElement:[
                            {"password" : <VisibilityOffOutlinedIcon />},
                            {"text" :<RemoveRedEyeOutlinedIcon />}
                        ]
                    }}/>
                </UForm>
            </UpperHoc>


    </>

}