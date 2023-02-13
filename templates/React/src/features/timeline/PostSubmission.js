import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";


export const PostSubmission = createAsyncThunk(
    'Feed/PostSubmission',
    async (body_sent) =>
    {
        const response= await  FetchCallSFK(
            "/api/Form/Response_to_form/",  "Post",
            body_sent,false,commonFailurerfunction,
            ["id"], ["Company_name","Company_logo","Employers_Website"],
        )
        return response
    }

);
