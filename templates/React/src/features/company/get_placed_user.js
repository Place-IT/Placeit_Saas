import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";


export const GetUsers = createAsyncThunk(
    'Company/GetUsers',
    async (body_sent) =>
    {
        const response= await  FetchCallSFK(
            `/api/Form/Form_Response_To_User/?Form_id=&Visitng_record__id=${body_sent}`,  "Get",
            false,false,false,
            ["results"], ["detail","company"],
        )
        return response
    }
);
