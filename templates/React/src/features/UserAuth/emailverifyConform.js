import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const emailverifyConform = createAsyncThunk(
    'Auth/emailverifyConform',

      async (body_sent) =>
     {

         logdata("emailverifyConform","init",`Data body_sent:"${body_sent}"`)
         const response= await  FetchCallSFK(
             "/api/auth/CUser/email_verify_conform/",  "post",
             body_sent,false,commonFailurerfunction,
             ["success","isAuthenticated"], ["detail","error","token","no token exist"],
         )
         logdata("emailverifyConform","Complete",`Data response:"${response}"`)
        return response

     }

);