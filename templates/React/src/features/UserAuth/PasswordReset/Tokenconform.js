import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../../CommonFunctions/Fetch/FetchCall";
import wrapper from "../../../CommonFunctions/Fetch/failureFunction";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";


export const TokenConfrom = createAsyncThunk(
    'Auth/TokenConfrom',

      async (body_sent) =>
     {
         logdata("TokenConfrom","init",`body_sent:"${body_sent}"`)
         const response= await  FetchCallSFK(
             "/api/password_reset/validate_token/",  "Post",
             body_sent,false,false,
             ["status"], ["detail"],
         )
         logdata("TokenConfrom","complete",`response:"${response}"`)

         return response

     }

);