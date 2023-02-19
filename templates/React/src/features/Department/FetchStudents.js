import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const FetchStudents = createAsyncThunk(
    'Student/FetchStudents',

    async (body_sent) =>
    {
        logdata("FetchStudents","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(

            `/api/auth/User/?search=${body_sent[0]}&collage_passingYear=${body_sent[1]}&Affliated_Department__name=${body_sent[2]}`,  "Get",
            false,false,false,
            ["results","count"], ["detail"],
        )
        logdata("FetchStudents","complete",`Data response:"${response}"`)
        return response

    }

);