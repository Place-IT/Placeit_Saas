import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";


export const Create_Company = createAsyncThunk(
    'Company/Creat_Company',
    async (body_sent) =>
    {
        const response= await  FetchCallSFK(
            "/api/Company/Company/",  "Post",
            body_sent,false,commonFailurerfunction,
            ["id"], ["Company_name","Company_logo","Employers_Website"],
        )
        return response
    }

);
