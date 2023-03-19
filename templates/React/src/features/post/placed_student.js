import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const List_of_placed_student = createAsyncThunk(
    'Post/List_of_placed_student',

    async (body_sent) =>
    {
        logdata("List_of_placed_student","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Form/Form_Response_To_User/?Form_id=${body_sent}&Visitng_record__id=&company__id=`,  "Get",
            false,false,false,
            ["results","count"], ["detail"],
        )
        logdata("List_of_placed_student","complete",`Data response:"${response}"`)
        return response
    }
);