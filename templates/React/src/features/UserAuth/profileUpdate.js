import {createAsyncThunk} from "@reduxjs/toolkit";
import  {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";

let a=['id', 'email', 'MIS_no', 'Bio', 'First_name', 'middle_name', 'Last_name', 'Date_Of_Birth', 'Country_name', 'State_name', 'Locality_name', 'PostalCode', 'Building_name_And_RoomNumber', 'Student_phone_number', 'Parent_phone_number', 'Roll_no', 'JEE', 'MhCET', 'SSC', 'HSC', 'Diploma', 'Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6', 'Sem7', 'Sem8', 'DeadKT', 'No_Of_DeadKT', 'LiveKT', 'No_Of_LiveKT', 'Gate_Status', 'future_options', 'linkedin_profile', 'Github_profile', 'Resume_profile', 'Internship', 'collage_passingYear', 'collage_joinig_year', 'i_card_image', 'email_verified', 'Affliated_Department','detail']

export const ProfileUpdate = createAsyncThunk(
    'Auth/ProfileUpdate',

    async (body_sent) =>
    {
        let response;

        logdata("ProfileUpdate","init",`initated with data:${body_sent}`)
        if(Object.keys(body_sent).includes("image_update"))
        {
            let form_data = new FormData();
            form_data.append("i_card_image", body_sent.i_card_image,body_sent.name);
            response= await  FetchCallSFK(
                `/api/auth/User/${body_sent.id}/`,  "Put",
                 {form_data:form_data,image:true},false,commonFailurerfunction,
                ["id"],a,'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            )
        }
        else
        {
            response= await  FetchCallSFK(
                `/api/auth/User/${body_sent.id}/`,  "Put",
                body_sent,false,commonFailurerfunction,
                ["id"],a,
            )
        }
        logdata("ProfileUpdate","Completed",`return :${response}`)
        return response
    }

);