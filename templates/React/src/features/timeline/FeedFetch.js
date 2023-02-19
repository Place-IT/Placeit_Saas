import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const FetchFeed = createAsyncThunk(
    'Feed/FetchFeed',

    async (body_sent) =>
    {

        logdata("FetchFeed","init",`body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Form/Form/`,  "Get",
            body_sent,false,false,
            ["results","count"], ["detail"],
        )
        logdata("FetchFeed","Completed",`response:"${response}"`)
        return response
    }

);
// `/api/Form/Form/?expire_date_time=${new Date().toISOString()}`