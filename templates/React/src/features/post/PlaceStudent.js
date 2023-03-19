import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const PlaceStudent = createAsyncThunk(
    'Post/PlaceStudent',
    async (body_sent) =>
    {
        logdata("PlaceStudent","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Form/Form_Response_To_User/`,  "Post",
            body_sent,false,false,
            ["Completed"], ["detail"],
        )
        logdata("PlaceStudent","complete",`Data response:"${response}"`)
        return response
    }

);