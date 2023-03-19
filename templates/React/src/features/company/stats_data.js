import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const Compnay_visitngStats_record = createAsyncThunk(
    'Company/Compnay_visitngStats_record',
    async (body_sent) =>
    {
        logdata("Compnay_visitng_record","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Company/VisitRecord_stats/?passing_year=${body_sent}`,  "Get",
            false,false,false,
            ["results"], ["detail","company"],
        )
        logdata("Compnay_visitng_record","complete",`Data response:"${response}"`)
        return response
    }
);
