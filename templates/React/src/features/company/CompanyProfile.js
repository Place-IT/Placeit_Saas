import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";


export const Company_Profile = createAsyncThunk(
    'Company/Company_profile_fetch',
    async (body_sent) =>
    {
         const response= await  FetchCallSFK(
            `/api/Company/Company/?id=${body_sent}`,  "Get",
            false,false,false,
            ["results"], ["detail"],
        )

        return response
    }
);
