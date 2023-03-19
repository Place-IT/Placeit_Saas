import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";
import wrapper from "../../CommonFunctions/Fetch/failureFunction";


export const PostFetch = createAsyncThunk(
    'Post/PostFetch',

    async (body_sent) =>
    {
        logdata("PostFetch","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Form/Form/?Creation_Date=&id=${body_sent}&Originator=&expire_date_time=&start_date=&end_date=&expiration_date=`,  "Get",
            false,false,wrapper(["detail","Form_id"]),
            ["results","count"], ["detail","Form_id"],
        )
        logdata("PostFetch","complete",`Data response:"${response}"`)
        return response
    }

);