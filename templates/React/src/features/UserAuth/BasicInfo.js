import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const Basic_info = createAsyncThunk(
    'Auth/Basic_info',

      async (body_sent) =>
     {

         logdata("Basic_info","init",`body_sent:"${body_sent}"`)
         const response= await  FetchCallSFK(
             "/api/auth/User/BasicInfoOfAuthenticatedUser/",  "Get",
             body_sent,false,false,
             ["success","isAuthenticated"], ["detail","error"],
         )
         logdata("Basic_info","init",`response:"${response}"`)
        return response

     }

);