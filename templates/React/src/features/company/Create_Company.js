import {createAsyncThunk} from "@reduxjs/toolkit";
import{FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const Create_Company = createAsyncThunk(
    'Company/Creat_Company',
    async (body_sent) =>
    {
        logdata("Create_Company","init",`Data body_sent:"${body_sent}"`)
        let form_data = new FormData();
        for ( var key in body_sent ) {
            form_data.append(key, body_sent[key]);
        }
        console.log(form_data)
        const response= await  FetchCallSFK(
            "/api/Company/Company/",  "Post",
            form_data,false,commonFailurerfunction,
            ["id"], ["Company_name","Company_logo","Employers_Website"],'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        )
        logdata("Create_Company","complete",`Data response:"${response}"`)
        return response
    }

);
