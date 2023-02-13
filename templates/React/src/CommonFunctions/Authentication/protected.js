import React from "react";
import {useSelector} from "react-redux";
import {
     selectLogin,
    
} from "./../../features/UserAuth/AuthSlicer";
import {logdata} from "../Logger/Logevents";

const Protected = ({ isLoggedIn, children }) => {
const Login_state = useSelector(selectLogin);
 if (!Login_state.Login && Login_state.LoginStateChecked ) {
    window.location.pathname="/auth/login/";
 }

 if(Login_state.LoginStateChecked === false) {
     logdata("Protected","info",`not loggedin`)

     return  ""
}
 else
    {
        logdata("Protected","info",`loggedin`)
        return children;
    }
};
export default Protected;