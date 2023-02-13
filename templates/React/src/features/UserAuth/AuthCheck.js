import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const Check_Auth = createAsyncThunk(
    'Auth/Check_Auth',

      async (body_sent) =>
     {
         logdata("Check_Auth","init",`body_sent:"${body_sent}"`)
         const response= await  FetchCallSFK(
             "/api/auth/User/Check_Auth/",  "Get",
             body_sent,false,false,
             ["success","isAuthenticated"], ["error","detail"],
         )
         logdata("Check_Auth","complete",`response:"${response}"`)
        return response

     }

);
