import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const GetUsers = createAsyncThunk(
    'Company/GetUsers',
    async (body_sent) =>
    {
        logdata("GetUsers","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            `/api/Form/Form_Response_To_User/?Visitng_record__id=${body_sent}`,  "Get",
            false,false,false,
            ["results"], ["detail","company"],
        )
        logdata("GetUsers","complete",`Data response:"${response}"`)
        return response
    }
);
