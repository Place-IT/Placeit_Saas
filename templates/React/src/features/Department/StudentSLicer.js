import {createSlice} from "@reduxjs/toolkit";
import {LoginThunk} from "../UserAuth/Login";
import {FetchStudents} from "./FetchStudents";


const initialState = {
    error_msg:"",
    error:false,
    status:"idle",
    success:false,
    SuccessMsg:"Succesfully Done",
    data:[]
};





export const StudentSlice = createSlice({
    name: 'Student',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(FetchStudents.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error=false
                    state.Success=false
                }
            })
            .addCase(FetchStudents.fulfilled, (state, action) => {
                // console.log(action,action.payload.type)
                if (action.payload.type === true)
                {
                    // console.log("true")
                    state.Login= true
                    state.error=false
                    state.status="idle"
                    // state.Success=true
                    // state.SuccessMsg="User LoggedIn succesfully"
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


    }
})








export const selectStatus = (state) => state.Student.status;
export const selectError = (state) => {
    return {error: state.Student.error, error_msg: state.Student.error_msg}
};

export const SuccessSelector = (state) => {

    return {Success: state.Student.Success, Success_msg: state.Student.SuccessMsg}
};
export const selectResult = (state) => state.Student.data;

export default StudentSlice.reducer;



function clean_result(result)
{
    return result.forEach(ev=>{
        let companys=[]


    })
}