import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";


export const PostCreation = createAsyncThunk(
    'Post/PostCreation',
    async (body_sent) =>
    {
        logdata("PostCreation","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
                `/api/Form/Form_view/`,  "Post",
            body_sent,false,commonFailurerfunction,
            ["Completed"], ["detail","error","Visitng_record","Creator_note"],
        )
        logdata("PostCreation","complete",`Data response:"${response}"`)
        return response
    }
);