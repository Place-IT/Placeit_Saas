import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";


export const Create_Company_visitng = createAsyncThunk(
    'Company/Creat_Visiting',
    async (body_sent) =>
    {
        const response= await  FetchCallSFK(
            "/api/Company/VisitRecord/",  "Post",
            body_sent,false,commonFailurerfunction,
            ["id"], ["visiting_date","HRName","Position","MinLpa_offered","MaxLpa_offered","Description","Pdf","company"],
        )
        return response
    }

);
