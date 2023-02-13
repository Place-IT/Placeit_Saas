import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../../CommonFunctions/Fetch/FetchCall";
import wrapper from "../../../CommonFunctions/Fetch/failureFunction";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";

export const PasswordResetPost = createAsyncThunk(
    'Auth/PasswordResetPost',

      async (body_sent) =>
     {
         logdata("PasswordResetPost","init",`body_sent:"${body_sent}"`)
         const response= await  FetchCallSFK(
             "/api/password_reset/",  "Post",
             body_sent,false,wrapper(["error"]),
             ["status"], ["email","error"],
         )
         logdata("PasswordResetPost","init",`response:"${response}"`)
        return response

     }

);