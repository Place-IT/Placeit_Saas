import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const Change_password = createAsyncThunk(
    'Auth/change_password',

      async (body_sent) =>
     {
         logdata("Change_password thunk","init",`Data body_sent:"${body_sent}"`)
         const response= await  FetchCallSFK(
             "/api/auth/CUser/change_password/",  "Post",
             body_sent,false,commonFailurerfunction,
             ["success","isAuthenticated"], ["error","detail","new_password","old_password"],
         )
         logdata("Change_password thunk","complete",`Data response:"${response}"`)
         return response
     }

);