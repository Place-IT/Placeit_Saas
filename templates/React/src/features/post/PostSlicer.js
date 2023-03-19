import {createSlice} from "@reduxjs/toolkit";
import {FetchStudents} from "../Department/FetchStudents";
import {PostFetch} from "./PostFetch";
import {PlaceStudent} from "./PlaceStudent";
import {UnPlaceStudent} from "./UnPlaceStudent";
import {FetchResponses} from "./fetch_responses";
import {StudentSlice} from "../Department/StudentSLicer";
import {PostCreation} from "./postCreation";
import {DeletePost} from "./Delete_post";
import {Compnay_visitng_record} from "../company/Visitng_record";

const initialState = {
    error_msg:"",
    error:false,
    status:"idle",
    Success:false,
    SuccessMsg:"Succesfully Done",
    data:[],
    data2:[],
    update:true,
    ss:false,
    cvr_fetch:false,
    Compnay_visitng_record:[],
    ss1:false,
};

export const PostSlice = createSlice({
    name: 'Post',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(PostFetch.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error = false
                    state.Success = false
                    state.ss=false
                }
            })
            .addCase(PostFetch.fulfilled, (state, action) => {
                if (action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.data = action.payload.response.results
                    state.ss=true
                } else {
                    state.status = "idle"
                    state.Login = false
                    state.error = true
                    state.error_msg = action.payload.response["error"]
                }
            })
            .addCase(FetchResponses.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error1 = false
                    state.Success = false
                    state.ss1=false
                }
            })
            .addCase(FetchResponses.fulfilled, (state, action) => {
                if (action.payload.type === true) {
                    state.error1 = false
                    state.status = "idle"
                    state.data2= action.payload.response.results
                    state.ss1=true

                } else {
                    window.location.href="/errors/404/"
                    state.status = "idle"
                    state.Login = false
                    state.error1 = true
                    state.error_msg = action.payload.response["error"]
                }
            })
            .addCase(PostCreation.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error = false
                    state.Success = false
                    state.update= false
                }
            })
            .addCase(PostCreation.fulfilled, (state, action) => {
                if (action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.update= true
                    state.Success=true
                    state.SuccessMsg = action.payload.response["Completed"]
                } else {
                    state.status = "idle"
                    state.Login = false
                    state.error = true
                    state.update= true
                    state.error_msg = action.payload.response["error"]
                }

            })

            .addCase(PlaceStudent.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error = false
                    state.Success = false
                    state.update= false
                }
            })
            .addCase(PlaceStudent.fulfilled, (state, action) => {
                if (action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.update= true
                    state.Success=true
                    state.SuccessMsg = action.payload.response["Completed"]
                } else {
                    state.status = "idle"
                    state.Login = false
                    state.error = true
                    state.update= true
                    state.error_msg = action.payload.response["error"]
                }

            })
            .addCase(UnPlaceStudent.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error = false
                    state.Success = false
                    state.update= false
                }
            })
            .addCase(UnPlaceStudent.fulfilled, (state, action) => {
                if (action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.Success= true
                    state.SuccessMsg = action.payload.response["Completed"]
                    state.update= true
                } else {
                    state.status = "idle"
                    state.Login = false
                    state.error = true
                    state.error_msg = action.payload.response["error"]
                    state.update= true
                }
            })
            .addCase(DeletePost.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error = false
                    state.Success = false
                    state.update= false
                }
            })
            .addCase(DeletePost.fulfilled, (state, action) => {
                if (action.payload.type === true) {
                    state.error = false
                    state.status = "idle"
                    state.Success= true
                    state.SuccessMsg = action.payload.response["Completed"]
                    window.location.href="/dashboard/post_list/"
                    state.update= true
                } else {
                    state.status = "idle"
                    state.Login = false
                    state.error = true
                    state.error_msg = action.payload.response["error"]
                    state.update= true
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
    }
})

export const selectStatus = (state) => state.Post.status;
export const selectError = (state) => {
    return {error: state.Post.error, error_msg: state.Post.error_msg}
};
export const SuccessSelector = (state) => {
    return {
        Success: state.Post.Success,
        Success_msg: state.Post.SuccessMsg,
        update:state.Post.update,
        ss:state.Post.ss,
        ss1:state.Post.ss1,
        cvr_fetch:state.Post.cvr_fetch}
        };
export const selectResult = (state) => {
    return{
        data:state.Post.data,
        data2:state.Post.data2,
        Compnay_visitng_record:state.Post.Compnay_visitng_record
    }
};
export default PostSlice.reducer;

