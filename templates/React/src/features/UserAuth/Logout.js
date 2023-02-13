import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";




export const Logout = createAsyncThunk(
    'Auth/Logout',
    async (body_sent) => {

        logdata("Logout thunk","init",`Data body_sent:"${body_sent}"`)

        const response= await  FetchCallSFK(
            "/api/auth/User/Logout/",  "Get",
            body_sent,false,false,
            ["success"], ["error"],
        )
        logdata("Logout thunk","Complete",`Data response:"${response}"`)
        return response;
    }
);