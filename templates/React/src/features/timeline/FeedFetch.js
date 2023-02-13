import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";


export const FetchFeed = createAsyncThunk(
    'Feed/FetchFeed',

    async (body_sent) =>
    {
        const response= await  FetchCallSFK(
            `/api/Form/Form/`,  "Get",
            body_sent,false,false,
            ["results","count"], ["detail"],
        )
        return response

    }

);
// `/api/Form/Form/?expire_date_time=${new Date().toISOString()}`