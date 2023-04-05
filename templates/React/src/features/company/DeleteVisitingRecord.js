import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";
import {Delete_check} from "../../CommonFunctions/Error_controlReact/manageErrors";


export const DeleteVisitingRecord = createAsyncThunk(
    'Post/DeleteVisitingRecord',

    async (body_sent) =>
    {
        logdata("DeleteVisitingRecord","init",`Data body_sent:"${body_sent}"`)

        const response= await  FetchCallSFK(
            `/api/Company/VisitRecord/${body_sent}/`,  "Delete",
            false,false,false   ,
            ["Completed","count","success"], ["detail","error"],'application/json',[Delete_check]
        )
        logdata("DeleteVisitingRecord","complete",`Data response:"${response}"`)
        return response
    }
);