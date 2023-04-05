import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";
import {Delete_check} from "../../CommonFunctions/Error_controlReact/manageErrors";


export const DeletePost = createAsyncThunk(
    'Post/DeletePost',

    async (body_sent) =>
    {
        logdata("DeletePost","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Form/Form_view/${body_sent}/`,  "Delete",
            false,false,false   ,
            ["Completed"], ["detail","error"],'application/json',[Delete_check]
        )
        console.log(response)
        logdata("DeletePost","complete",`Data response:"${response}"`)
        return response
    }
);