// import {createSlice} from "@reduxjs/toolkit";
// import {Signup} from "../UserAuth/Signup";
//
// const initialState = {
//     error_msg:"",
//     error:false,
//     status:"idle"
// };
//
//
//
//
//
// export const FormSlice = createSlice({
//     name: 'Form',
//     initialState,
//     // extraReducers: (builder) => {
//     //     builder
//     //
//     //         .addCase(Signup.pending, (state) => {
//     //             state.status = 'loading';
//     //             state.error=false
//     //             state.Success=false
//     //         })
//     //         .addCase(Signup.fulfilled, (state, action) => {
//     //             // console.log(action,"dddddddxxdddd")
//     //             if (action.payload.type === true)
//     //             {
//     //                 state.Login= true
//     //                 state.error=false
//     //                 state.Signup=true
//     //                 state.status="idle"
//     //                 state.Success=true
//     //                 state.SuccessMsg="User Signup succesfully"
//     //             }else
//     //             {
//     //                 // console.log("not true")
//     //                 state.Login= false
//     //                 state.status="idle"
//     //                 state.error=true
//     //                 state.Signup=false
//     //                 state.error_msg=action.payload.response["error"]
//     //             }
//     //         })
//
//
//     }})
//
//
//
//
//
// // export const selectLogin = (state) =>{
// //     return{Login:state.Auth.Login, LoginStateChecked:state.Auth.LoginStateChecked}
// // };
//
// export default FormSlice.reducer;
//
