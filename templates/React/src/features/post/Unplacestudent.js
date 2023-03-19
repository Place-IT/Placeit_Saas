import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const UnPlaceStudent = createAsyncThunk(
    'Post/UnPlaceStudent',
    async (body_sent) =>
    {
        logdata("UnPlaceStudent","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Form/Form_Response_To_User/destroy_list/`,  "Delete",
            body_sent,false,false,
            ["Completed"], ["detail"],
        )
        logdata("UnPlaceStudent","complete",`Data response:"${response}"`)
        return response
    }

);