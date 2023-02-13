import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";




export const Signup = createAsyncThunk(
    'Auth/Signup',
    async (body_sent) => {

        logdata("Logout thunk","init",`Data body_sent:"${body_sent}"`)

        const response= await  FetchCallSFK(
            "/api/auth/CUser/",  "Post",
            body_sent,false,commonFailurerfunction,
            ["success"], ["error","email",'password','re_password'],
        )

        logdata("Logout thunk","completed",`response:"${response}"`)
        return response;
    }
);