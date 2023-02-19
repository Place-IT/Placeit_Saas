import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const Create_Company_visitng = createAsyncThunk(
    'Company/Creat_Visiting',
    async (body_sent) =>
    {
        logdata("Create_Company_visitng","init",`Data body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            "/api/Company/VisitRecord/",  "Post",
            body_sent,false,commonFailurerfunction,
            ["id"], ["visiting_date","HRName","Position","MinLpa_offered","MaxLpa_offered","Description","Pdf","company"],
        )
        logdata("Create_Company_visitng","complete",`Data response:"${response}"`)
        return response
    }

);
