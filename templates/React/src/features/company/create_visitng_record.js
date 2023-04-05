import {createAsyncThunk} from "@reduxjs/toolkit";
import FetchCall, {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";


export const Create_Company_visitng = createAsyncThunk(
    'Company/Creat_Visiting',
    async (body_sent) =>
    {
        logdata("Create_Company_visitng","init",`Data body_sent:"${body_sent}"`)
        let form_data = new FormData();
        if( body_sent.image !== undefined){
            form_data.append("Pdf", body_sent.image,body_sent.name);
        }
        form_data.append("visiting_date", body_sent.data.visiting_date);
        form_data.append("HRName", body_sent.data.HRName);
        form_data.append("Position", body_sent.data.Position);
        form_data.append("MinLpa_offered", body_sent.data.MinLpa_offered);
        form_data.append("MaxLpa_offered", body_sent.data.MaxLpa_offered);
        form_data.append("Description", body_sent.data.Description);
        form_data.append("company", body_sent.data.company);

        const response= await  FetchCallSFK(
            "/api/Company/VisitRecord/", "Post",
            {form_data:form_data,image:true},false,commonFailurerfunction,
            ["id"], ["visiting_date", "HRName", "Position",
                "MinLpa_offered", "MaxLpa_offered", "Description"],
        )


        logdata("Create_Company_visitng","complete",`Data response:"${response}"`)
        return response
    }

);
