import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const FetchFeed = createAsyncThunk(
    'Feed/FetchFeed',

    async (body_sent) =>
    {

        logdata("FetchFeed","init",`body_sent:"${body_sent}"`)

        let url=`/api/Form/Form/?id=`
        if(body_sent !== false)
        {
            url =`/api/Form/Form/?id=${body_sent}`
            console.log(url)
        }

        const response= await  FetchCallSFK(
            url,  "Get",
            false,false,false,
            ["results","count"], ["detail"],
        )

        logdata("FetchFeed","Completed",`response:"${response}"`)
        return response
    }
);