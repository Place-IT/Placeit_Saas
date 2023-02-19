import {createSlice} from "@reduxjs/toolkit";
import {Signup} from "../UserAuth/Signup";
import {Create_Company} from "./Create_Company";
import {Company_Search} from "./Company_Search";
import {Company_Profile} from "./CompanyProfile";
import {Compnay_visitng_record} from "./Visitng_record";
import {Create_Company_visitng} from "./create_visitng_record";
import {GetUsers} from "./get_placed_user";

const initialState = {
    error_msg:"",
    error:false,
    status:"idle",
    Success:false,
    Success_msg:"",
    Company_list:[],
    profile_fetch_success:false,
    cvr_fetch:false,
    Compnay_visitng_record:[],
    to:"/dashboard/company_profile/",
    User_list:[]
};





export const Company = createSlice({
    name: 'Company',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(Create_Company.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(Create_Company.fulfilled, (state, action) => {
               console.log("ssssssssssssssssss")
                if(action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.Success = true
                    state.SuccessMsg = "Company Profile Creaed Sucessfully"
                    state.to="/dashboard/company_profile/"+action.payload.response["id"]+"/"
                } else {
                    state.status = "idle"
                    state.error = true
                    state.error_msg = action.payload.response["error"]
                }
                console.log("sssssssssssssssssssss1")
            })
            .addCase(Company_Search.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(Company_Search.fulfilled, (state, action) => {
                if(action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.Company_list=action.payload.response.results
                } else {
                    state.status = "idle"
                    state.error = true
                    state.error_msg = action.payload.response["error"]

                }
            })
            .addCase(Company_Profile.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(Company_Profile.fulfilled, (state, action) => {
                if(action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.profile_fetch_success=true
                    state.Company_list=action.payload.response.results
                } else {
                    state.status = "idle"
                    state.error = true
                    state.error_msg = action.payload.response["error"]

                }
            })
            .addCase(Compnay_visitng_record.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
                state.cvr_fetch=false
            })
            .addCase(Compnay_visitng_record.fulfilled, (state, action) => {
                if(action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.cvr_fetch=true
                    state.Compnay_visitng_record=action.payload.response.results
                } else {
                    state.status = "idle"
                    state.error = true
                    state.error_msg = action.payload.response["error"]

                }
            })
            .addCase(GetUsers.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(GetUsers.fulfilled, (state, action) => {
                if(action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.User_list=action.payload.response.results
                } else {
                    state.status = "idle"
                    state.error = true
                    state.error_msg = action.payload.response["error"]
                }
            })
            .addCase(Create_Company_visitng.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(Create_Company_visitng.fulfilled, (state, action) => {
                if(action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.Success = true
                    state.SuccessMsg = "Company Profile Creaed Sucessfully"
                    state.to=window.location.pathname+"/visitng_record/"+action.payload.response["id"]+"/"
                } else {
                    state.status = "idle"
                    state.error = true
                    state.error_msg = action.payload.response["error"]
                }
            })
    }
    })

export const selectStatus = (state) => state.Company.status;
export const selectError = (state) => {
    return {error: state.Company.error, error_msg: state.Company.error_msg}
};
export const SuccessSelector = (state) => {

    return {Success: state.Company.Success, Success_msg: state.Company.SuccessMsg,profile_fetch_success: state.Company.profile_fetch_success,to:state.Company.to,cvr_fetch:state.Company.cvr_fetch}
};
export const selectCompany_list = (state) => state.Company.Company_list;
export const SelectCompnay_visitng_record =(state)=>state.Company.Compnay_visitng_record
export const selectCompany_visitng_list = (state) => state.Company.Compnay_visitng_record;
export const User_list = (state) => state.Company.User_list;
export default Company.reducer;