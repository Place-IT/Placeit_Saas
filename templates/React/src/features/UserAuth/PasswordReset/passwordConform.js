import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../../CommonFunctions/Fetch/FetchCall";
import failureDefaultFunction from "../../../CommonFunctions/Fetch/failureFunction";
import wrapper from "../../../CommonFunctions/Fetch/failureFunction";
import commonFailurerfunction from "../../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";


export const PasswordConfrom = createAsyncThunk(
    'Auth/PasswordConfrom',

      async (body_sent) =>
     {
         logdata("PasswordConfrom","init",`body_sent:"${body_sent}"`)
         const response= await  FetchCallSFK(
             "/api/password_reset/confirm/",  "Post",
             body_sent,false,commonFailurerfunction,
             ["status"], ["detail","token","password"],
         )
         logdata("PasswordConfrom","complete",`response:"${response}"`)

        return response

     }

);