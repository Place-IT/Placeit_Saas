import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const Create_Company = createAsyncThunk(
    'Company/Creat_Company',
    async (body_sent) =>
    {
        logdata("Create_Company","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            "/api/Company/Company/",  "Post",
            body_sent,false,commonFailurerfunction,
            ["id"], ["Company_name","Company_logo","Employers_Website"],
        )
        logdata("Create_Company","complete",`Data response:"${response}"`)
        return response
    }

);
