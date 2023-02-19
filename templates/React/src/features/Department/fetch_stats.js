import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const FetchStats = createAsyncThunk(
    'Student/FetchStats',

    async (body_sent) =>
    {

        logdata("FetchStats","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Department/DepartmentProfile/?passing_year=${body_sent}`,  "Get",
            false,false,false,
            ["results","count"], ["detail"],
        )
        logdata("FetchStats","complete",`Data response:"${response}"`)

        return response

    }

);