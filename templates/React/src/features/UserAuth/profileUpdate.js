import {createAsyncThunk} from "@reduxjs/toolkit";
import  {FetchCallSFK} from "../../CommonFunctions/Fetch/FetchCall";
import commonFailurerfunction from "../../CommonFunctions/Fetch/common_faiure_function";
import {logdata} from "../../CommonFunctions/Logger/Logevents";

let a=window.list_of_all_fields

export const ProfileUpdate = createAsyncThunk(
    'Auth/ProfileUpdate',

    async (body_sent) =>
    {
        let response;

        logdata("ProfileUpdate","init",`initated with data:${body_sent}`)
        if(Object.keys(body_sent).includes("image_update"))
        {
            if(Object.keys(body_sent).includes("delete"))
            {
                response= await  FetchCallSFK(
                    `/api/auth/User/${body_sent.id}/`,  "PATCH",
                    {
                        "i_card_image":null
                    },false,commonFailurerfunction,
                    ["id"],a,
                )
            }
            else {


                let form_data = new FormData();
            form_data.append("i_card_image", body_sent.i_card_image,body_sent.name);
            response= await  FetchCallSFK(
                `/api/UserImageUploadView/${body_sent.id}/`, "Post",
                 {form_data:form_data,image:true},false,commonFailurerfunction,
                ["id","Success"],a
            )
            }

        }
        else
        {

            response= await  FetchCallSFK(
                `/api/auth/User/${body_sent.id}/`,  "Patch",
                body_sent,false,commonFailurerfunction,
                ["id"],[...window.list_of_all_fields],
            )
        }
        logdata("ProfileUpdate","Completed",`return :${response}`)
        return response
    }

);