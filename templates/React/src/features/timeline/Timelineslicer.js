import {createSlice} from "@reduxjs/toolkit";
import {FetchFeed} from "./FeedFetch";
import {PostSubmission} from "./PostSubmission";



const initialState = {
    error_msg:"",
    error:false,
    status:"idle",
    success:false,
    SuccessMsg:"Succesfully Done",
    data:[],
    fetchComplele:false,
};


export const FeedSlice = createSlice({
    name: 'Feed',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(FetchFeed.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error=false
                    state.Success=false
                }
            })
            .addCase(FetchFeed.fulfilled, (state, action) => {
                state.fetchComplele=true
                if (action.payload.type === true)
                {
                    // console.log("true")
                    state.Login= true
                    state.error=false
                    state.status="idle"
                    state.data=action.payload.response.results
                }else
                {
                    // console.log("not true")
                    state.status="idle"
                    state.Login= false
                    state.error=true
                    state.error_msg=action.payload.response["error"]
                }

            })
            .addCase(PostSubmission.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error=false
                    state.Success=false
                }
            })
            .addCase(PostSubmission.fulfilled, (state, action) => {
                state.fetchComplele=true
                if (action.payload.type === true)
                {
                    // console.log("true")
                    state.Login= true
                    state.error=false
                    state.status="idle"
                    state.Success = true
                    state.SuccessMsg = "Response Submitted Successfully"
                    // state.data=action.payload.response.results
                }else
                {
                    // console.log("not true")
                    state.status="idle"
                    state.Login= false
                    state.error=true
                    state.error_msg=action.payload.response["error"]
                }

            })

    }
})








export const selectStatus = (state) => state.Feed.status;
export const selectError = (state) => {
    return {error: state.Feed.error, error_msg: state.Feed.error_msg}
};

export const SuccessSelector = (state) => {

    return {Success: state.Feed.Success, Success_msg: state.Feed.SuccessMsg}
};
export const selectResult = (state) => state.Feed.data;

export default FeedSlice.reducer;



function clean_result(result)
{
    return result.forEach(ev=>{
        let companys=[]
    })
}