import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";


export const Company_Search = createAsyncThunk(
    'Company/Company_Search',
    async (body_sent) =>
    {
        console.log(body_sent)
        const response= await  FetchCallSFK(
            `/api/Company/Company/?search=${body_sent.search}`,  "Get",
            false,false,false,
            ["results"], ["detail",],
        )

        return response
    }
);
