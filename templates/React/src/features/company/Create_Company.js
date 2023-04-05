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
        if( body_sent.image !== undefined){
            form_data.append("Company_logo", body_sent.image,body_sent.name);
        }
        form_data.append("Company_name", body_sent.data.Company_name);
        form_data.append("Employers_Website", body_sent.data.Employers_Website);

        const response= await  FetchCallSFK(
            "/api/Company/Company/", "Post",
            {form_data:form_data,image:true},false,commonFailurerfunction,
            ["id"], ["Company_name","Company_logo","Employers_Website"],
        )

        logdata("Create_Company","complete",`Data response:"${response}"`)
        return response
    }

);
