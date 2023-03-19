import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";

export const FetchResponses = createAsyncThunk(
    'Post/FetchResponses',

    async (body_sent) =>
    {
        logdata("FetchResponses","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Form/Response_to_form/?id=&user=&Form_id=${body_sent}&major_Response=true`,  "Get",
            false,false,false,
            ["results","count"], ["Form_id"],
        )
        logdata("FetchResponses","complete",`Data response:"${response}"`)
        return response
    }
);