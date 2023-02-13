import React, {useEffect, useState} from "react";
import {PasswordConfrom} from "../../../features/UserAuth/PasswordReset/passwordConform";
import {TokenConfrom}from "../../../features/UserAuth/PasswordReset/Tokenconform";
import {useDispatch,useSelector} from "react-redux";
import {
    selectStatus,
    selectError,
    SuccessSelector,
    IsTokenValid,
    tokenVerified
} from "../../../features/UserAuth/AuthSlicer";
import UForm from "../../../CommonFunctions/UniversalForm/Uform"
import InputCreator from "../../../CommonFunctions/UniversalForm/custominput"
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Backdrop from '@mui/material/Backdrop';
import {Link} from "react-router-dom";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {CircularProgress} from "@mui/material";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";


export default function EmailPasswordResent(props)
{
    const [state,setState]=useState({
        password:"",
        token:window.location.search.substring(window.location.search.indexOf('=')+1,window.location.search.length)    
    })
    const tokenValid = useSelector(IsTokenValid);
    const tokenVerifiedselector = useSelector(tokenVerified);
    const [tokenVerifiedSent,setTokenVerifiedsent]=useState(false)
    const [pstate,setSptate]=useState({
        1:"password",
        })
    const dispatch = useDispatch();


    useEffect(() => {
        logdata("EmailPasswordResent","init",`initiated with following props:${props} `)
    });

    if(tokenVerifiedSent === false )
    {
        logdata("EmailPasswordResent","init",`dispatched tokenVerifiedSent with following props:${{token:state.token}} `)
        setTokenVerifiedsent(true);
        dispatch(TokenConfrom({token:state.token}))
    }

    if(tokenVerifiedselector === false)
    {
     return <>
          <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                    >
                        <CircularProgress color="success" />
                    </Backdrop>
        </>
    }

    return (
            <>
             <UpperHoc redirect="/auth/profile/" Re={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>

                     {tokenValid?
                        <UForm Dispatch={PasswordConfrom}
                               Error={selectError}
                               state={state}
                               actionText="Reset Password"
                                heading="Password Reset Form"

                               p={<>
                                   <p >
                                       <a href="/auth/signup/" className="text-indigo-700" ><Link to="/auth/signup/"  >Sign up</Link></a>
                                   </p>
                                   <p >
                                       <a href="/auth/signup/" className="text-indigo-700" ><Link to="/auth/login/"  >login</Link></a>
                                   </p>
                               </>}

                        >
                       <InputCreator input={{type:"password",
                                           name:"password",
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
                     :
                 <div
                     className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
                     <div className="relative py-3 sm:max-w-xl mx-auto text-center">
                         <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                             <div className="h-2 bg-indigo-700 rounded-t-md"></div>
                             <div className="py-6 px-8">
                                 <span className="text-2xl text-red-700 font-light">Token invalid or experied</span>
                             </div>
                         </div>
                     </div>
                 </div>
                }
             </UpperHoc>
            </>
        );

}
