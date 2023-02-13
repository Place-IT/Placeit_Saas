import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const LoginThunk = createAsyncThunk(
    'Auth/Login',

      async (body_sent) =>
     {

         logdata("LoginThunk","init",`Data body_sent:"${body_sent}"`)
         const response= await  FetchCallSFK(
             "/api/auth/CUser/login/",  "Post",
             body_sent,false,false,
             ["success"], ["error","detail"],
         )
         logdata("LoginThunk","complete",`Data response:"${response}"`)
        return response
     }

);