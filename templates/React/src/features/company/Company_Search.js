import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const Company_Search = createAsyncThunk(
    'Company/Company_Search',
    async (body_sent) =>
    {
        logdata("Company_Search","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Company/Company/?search=${body_sent.search}`,  "Get",
            false,false,false,
            ["results"], ["detail",],
        )
        logdata("Company_Search","complete",`Data response:"${response}"`)
        return response
    }
);
