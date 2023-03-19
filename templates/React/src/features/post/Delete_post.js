import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const DeletePost = createAsyncThunk(
    'Post/DeletePost',

    async (body_sent) =>
    {
        logdata("DeletePost","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Form/Form_view/${body_sent}/`,  "Delete",
            false,false,false   ,
            ["Completed","count"], ["detail"],
        )
        console.log(response,"SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
        logdata("DeletePost","complete",`Data response:"${response}"`)
        return response
    }
);