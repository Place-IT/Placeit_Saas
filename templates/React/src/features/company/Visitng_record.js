import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";


export const Compnay_visitng_record = createAsyncThunk(
    'Company/Creat_Company_visitng_record',
    async (body_sent) =>
    {
        const response= await  FetchCallSFK(
            `/api/Company/VisitRecord/?company=${body_sent}`,  "Get",
            false,false,false,
            ["results"], ["detail","company"],
        )
        return response
    }

);
