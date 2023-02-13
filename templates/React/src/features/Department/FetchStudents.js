import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";


export const FetchStudents = createAsyncThunk(
    'Student/FetchStudents',

    async (body_sent) =>
    {


        const response= await  FetchCallSFK(
            "/api/auth/User/",  "Get",
            body_sent,false,false,
            ["results","count"], ["detail"],
        )
        return response

    }

);