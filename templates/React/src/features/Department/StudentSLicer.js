import {createSlice} from "@reduxjs/toolkit";
import {LoginThunk} from "../UserAuth/Login";
import {FetchStudents} from "./FetchStudents";
import {FetchStats} from "./fetch_stats";


const initialState = {
    error_msg:"",
    error:false,
    status:"idle",
    Success:false,
    SuccessMsg:"Succesfully Done",
    data:[],
    Sdata:[],
    update:false
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
                    state.Sdata=action.payload.response.results
                }else
                {
                    // console.log("not true")
                    state.status="idle"
                    state.Login= false
                    state.error=true
                    state.error_msg=action.payload.response["error"]
                }

            })
            .addCase(FetchStats.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error=false
                    state.update=false
                    state.Success=false
                }
            })
            .addCase(FetchStats.fulfilled, (state, action) => {
                // console.log(action,action.payload.type)
                if (action.payload.type === true)
                {
                    state.Login= true
                    state.error=false
                    state.status="idle"
                    state.update=true
                    let data={}
                    let a= window.department_list
                    a.forEach((ev,index)=>{
                        let x =action.payload.response.results.find(ev2=>ev2.name === ev)
                        if(x === undefined)
                        {
                           data[`${ev}`]={
                               "id": index,
                               "name": ev,
                               "no_of_students":0,
                               "no_of_students_placed": 0,
                               "no_of_company_visited": 0,
                               "Average_Package": "0.00",
                               "Range_max": "0.00",
                               "Range_min": "0.00",
                               "Total_no_of_HIgher_Studies_students": 0,
                               "Total_no_of_Gate_Studies_students": 0,
                               "Total_no_of_Entrepreneurship_students": 0
                           }
                        }
                        else
                        {
                            data[`${ev}`]=x
                        }
                    })
                    state.data=data
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
    return {Success: state.Student.Success, Success_msg: state.Student.SuccessMsg,update:state.Student.update}
};
export const selectResult = (state) => state.Student.data;
export const selectSResult = (state) => state.Student.Sdata;
export default StudentSlice.reducer;


