import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const Emailsend = createAsyncThunk(
    'Auth/emailsend',

      async (body_sent) =>
     {



         logdata("Emailsend thunk","init",`Data body_sent:"${body_sent}"`)
         const response= await  FetchCallSFK(
             "/api/auth/CUser/email_verify/",  "Post",
             body_sent,false,false,
             ["success","isAuthenticated"], ["detail","error"],
         )
         logdata("Emailsend thunk","init",`Data response:"${response}"`)
        return response

     }

);