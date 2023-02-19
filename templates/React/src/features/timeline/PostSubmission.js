import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const PostSubmission = createAsyncThunk(
    'Feed/PostSubmission',
    async (body_sent) =>
    {
        logdata("PostSubmission","init",`body_sent:"${body_sent}"`)
        const response= await  FetchCallSFK(
            "/api/Form/Response_to_form/",  "Post",
            body_sent,false,commonFailurerfunction,
            ["id"], ["Company_name","Company_logo","Employers_Website"],
        )
        logdata("PostSubmission","Completed",`response:"${response}"`)
        return response
    }
);
