import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {LoginThunk} from "./Login";
import {Signup} from "./Signup";
import {Logout} from "./Logout";
import {Check_Auth} from "./AuthCheck";
import {Basic_info} from "./BasicInfo";
import {Change_password} from "./ChangePassword";
import {Emailsend} from "./emailsend";
import {emailverifyConform} from "./EmailVerifyConform";
import {TokenConfrom} from "./PasswordReset/Tokenconform";
import {PasswordConfrom} from "./PasswordReset/passwordConform";
import {PasswordResetPost } from "./PasswordReset/PasswordResetPost"
import {ProfileUpdate} from "./profileUpdate";

const initialState = {
    Login:false,
    Signup:false,
    error_msg:"",
    error:false,
    status:"idle",
    Success:false,
    SuccessMsg:"Succesfully Done",
    LoginStateChecked:false,
    isTokenValid:false,
    tokenVerified:false,
    email_verified:undefined,
    Cache_check:false,
    id:"",
    First_name:"",
    middle_name:"",
    Last_name:"",
    Date_Of_Birth:"",
    Student_phone_number:"",
    Parent_phone_number:"",
    Bio:"",

    Country_name:"",
    State_name:"",
    Locality_name:"",
    PostalCode:"",
    Building_name_And_RoomNumber:"",

    Roll_no:"",
    MhCET:"",
    SSC:"",
    HSC:"",
    Diploma: null,
    Sem1: null,
    Sem2: null,
    Sem3: null,
    Sem4: null,
    Sem5: null,
    Sem6: null,
    Sem7: null,
    Sem8: null,
    MIS_no:null,


    DeadKT: false,
    No_Of_DeadKT: null,
    LiveKT: false,
    No_Of_LiveKT: 0,
    collage_passingYear: null,
    collage_joinig_year: null,

    Gate_Status: false,
    future_options: null,

    linkedin_profile: null,
    Github_profile:null,

    Resume_profile: null,


    Internship: "",

    i_card_image: null,
    email:"",
    is_suspended:"",
    is_faculty: false,
    groups:[],
    Affliated_Department:{}
};

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        errorSetup(state, action) {
            state.error = true
            state.error_msg = action.payload
        },
        errorUnsetup(state) {
            state.error = false
        }
    }
        ,
    extraReducers: (builder) => {
        builder
            //login
            .addCase(LoginThunk.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error=false
                    // state.Success=false
                }
            })
            .addCase(LoginThunk.fulfilled, (state, action) => {
                if (action.payload.type === true)
                {
                    console.log("true")
                    state.Login= true
                    state.error=false
                    state.status="idle"
                    state.Success=true
                    state.SuccessMsg="User LoggedIn succesfully"
                }else
                    {
                        state.status="idle"
                        state.Login= false
                        state.error=true
                        state.error_msg=action.payload.response["error"]
                }

            })
             .addCase(Check_Auth.pending, (state) => {
            {
                state.status = 'loading';
                state.LoginStateChecked=false;
                state.error=false
                state.Success=false
            }
        })
        .addCase(Check_Auth.fulfilled, (state, action) => {
            state.LoginStateChecked=true;
            if (action.payload.type === true)
            {
                state.Login= true
                state.error=false
                state.status="idle"
                
            }else
                {
                    state.Login= false
                    state.status="idle"
            }

        })
            .addCase(ProfileUpdate.pending, (state) => {
                {
                    state.status = 'loading';
                    state.error=false
                    state.Success=false

                }
            })
            .addCase(ProfileUpdate.fulfilled, (state, action) => {

                console.log(action)
                if (action.payload.type === true)
                {

                    state.Cache_check=true
                    state.Login= true
                    state.error=false
                    state.status="idle"
                    state.Success=true
                    state.SuccessMsg="Profile updated succesfully"
                }else
                {

                    state.error=true
                    state.status="idle"
                    state.error_msg=action.payload.response["error"]
                }

            })


            .addCase(Basic_info.pending, (state) => {
            {
                state.status = 'loading';
                state.error=false
            }
        })
        .addCase(Basic_info.fulfilled, (state, action) => {
            if (action.payload.type === true)
            {
                state.Cache_check=true
                // console.log("true")
                state.Login= true
                state.error=false
                state.status="idle"
                state.First_name=action.payload.response.data.First_name
                state.middle_name=action.payload.response.data.middle_name
                state.Last_name=action.payload.response.data.Last_name
                state.is_suspended=action.payload.response.data.is_suspended
                state.phone_number=action.payload.response.data.phone_number
                state.image=action.payload.response.data.image
                state.email=action.payload.response.data.email
                state.id=action.payload.response.data.id
                state.is_faculty=action.payload.response.data.is_faculty
                state.groups=action.payload.response.data.groups

                state.email_verified=action.payload.response.data.email_verified
                state.Bio=action.payload.response.data.Bio
                state.Date_Of_Birth=action.payload.response.data.Date_Of_Birth


                state.Sem1=action.payload.response.data.Sem1
                state.Sem2=action.payload.response.data.Sem2
                state.Sem3=action.payload.response.data.Sem3
                state.Sem4=action.payload.response.data.Sem4
                state.Sem5=action.payload.response.data.Sem5
                state.Sem6=action.payload.response.data.Sem6
                state.Sem7=action.payload.response.data.Sem7
                state.Sem8=action.payload.response.data.Sem8
                state.DeadKT=action.payload.response.data.DeadKT
                state.No_Of_DeadKT=action.payload.response.data.No_Of_DeadKT
                state.LiveKT=action.payload.response.data.LiveKT
                state.No_Of_LiveKT=action.payload.response.data.No_Of_LiveKT
                state.Gate_Status=action.payload.response.data.Gate_Status
                state.future_options=action.payload.response.data.future_options
                state.linkedin_profile=action.payload.response.data.linkedin_profile
                state.Resume_profile=action.payload.response.data.Resume_profile
                state.Internship=action.payload.response.data.Internship
                state.collage_passingYear=action.payload.response.data.collage_passingYear
                state.collage_joinig_year=action.payload.response.data.collage_joinig_year
                state.i_card_image=action.payload.response.data.i_card_image
                state.Country_name=action.payload.response.data.Country_name
                state.State_name=action.payload.response.data.State_name
                state.Locality_name=action.payload.response.data.Locality_name
                state.PostalCode=action.payload.response.data.PostalCode
                state.Building_name_And_RoomNumber=action.payload.response.data.Building_name_And_RoomNumber
                state.Student_phone_number=action.payload.response.data.Student_phone_number
                state.Parent_phone_number=action.payload.response.data.Parent_phone_number
                state.Roll_no=action.payload.response.data.Roll_no
                state.MhCET=action.payload.response.data.MhCET
                state.SSC=action.payload.response.data.SSC
                state.HSC=action.payload.response.data.HSC
                state.Diploma=action.payload.response.data.Diploma
                state.Github_profile=action.payload.response.data.Github_profile
                state.Affliated_Department=action.payload.response.data.Affliated_Department


            }else
                {
                    state.error=true
                    state.status="idle"
                    state.error_msg=action.payload.response["error"]
            }

        })
            //signup
            .addCase(Signup.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(Signup.fulfilled, (state, action) => {
                console.log(action,"dddddddxxdddd")
                if (action.payload.type === true)
                {
                    state.Login= true
                    state.error=false
                    state.Signup=true
                    state.status="idle"
                    state.Success=true
                    state.SuccessMsg="User Signup succesfully"
                }else
                {
                    state.Login= false
                    state.status="idle"
                    state.error=true
                    state.Signup=false
                    state.error_msg=action.payload.response["error"]
                }

            })
            //logout
            .addCase(Logout.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(Logout.fulfilled, (state, action) => {
                if (action.payload.type === true)
                {
                    state.Login= false
                    state.error=false
                    state.status="idle"
                    state.Success=true
                    state.SuccessMsg="User Loggedout succesfully"
                }else
                {
                    // console.log("not true")
                    state.Login= true
                    state.error=true
                    state.status="idle"
                    state.error_msg=action.payload.response["error"]
                }

            })
            //logout
            .addCase(Change_password.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(Change_password.fulfilled, (state, action) => {
                if (action.payload.type === true)
                {

                    state.error=false
                    state.status="idle"
                    state.Success=true
                    state.SuccessMsg="User Password Updated succesfully"
                }else
                {

                    state.Login= true
                    state.error=true
                    state.status="idle"
                    state.error_msg=action.payload.response["error"]
                }

            })
            .addCase(Emailsend.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(Emailsend.fulfilled, (state, action) => {
                if (action.payload.type === true)
                {
                    state.error=false
                    state.status="idle"
                    state.Success=true
                    state.SuccessMsg=`Verfication mail successfully sent on email  ${state.email}`
                }else
                {
                    state.Login= true
                    state.error=true
                    state.status="idle"
                    state.error_msg=action.payload.response["error"]
                }
            })
            
            .addCase(emailverifyConform.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(emailverifyConform.fulfilled, (state, action) => {
                console.log(action)
                if (action.payload.type === true)
                {
                    state.error=false
                    state.status="idle"
                    state.Success=true
                    state.SuccessMsg=`Email ${state.email} Successfully verified `
                }else
                {
                    state.Login= true
                    state.error=true
                    state.status="idle"
                    state.error_msg=action.payload.response["error"]
                }
            })
            .addCase(TokenConfrom.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(TokenConfrom.fulfilled, (state, action) => {
                state.tokenVerified=true;
                if (action.payload.type === true)
                {
                     state.isTokenValid=true
                     state.status="idle"
                }else
                {
                    state.status="idle"
                    state.isTokenValid=false
                    state.error=true
                    state.error_msg="email token expired"
                }
            })
            .addCase(PasswordResetPost.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(PasswordResetPost.fulfilled, (state, action) => {
                if (action.payload.type === true)
                {
                    state.status="idle"
                    state.Success=true
                    state.SuccessMsg=`Password Reset mail has been sent on ur email`
                }else
                {
                    state.error=true
                    state.status="idle"
                    state.error_msg=action.payload.response["error"]
                }
            })
            
            .addCase(PasswordConfrom.pending, (state) => {
                state.status = 'loading';
                state.error=false
                state.Success=false
            })
            .addCase(PasswordConfrom.fulfilled, (state, action) => {
                if (action.payload.type === true)
                {
                    state.status="idle"
                    state.Success=true
                    state.SuccessMsg=`Password Reset Successfully`
                }else
                {
                    state.error=true
                    state.status="idle"
                    state.error_msg=action.payload.response["error"]
                }
            });
    },
});

export const selectLogin = (state) =>{
    return{Login:state.Auth.Login, LoginStateChecked:state.Auth.LoginStateChecked}
};
export const selectStatus = (state) => state.Auth.status;
export const selectError = (state) => {
    return {error: state.Auth.error, error_msg: state.Auth.error_msg}
};
export const SuccessSelector = (state) => {

    return {Success: state.Auth.Success, Success_msg: state.Auth.SuccessMsg}
};

export const IsTokenValid=(state) => state.Auth.isTokenValid;
export const tokenVerified=(state) => state.Auth.tokenVerified;
export const BasicDetailsU = (state) => {

    return {
        id: state.Auth.id,
        email: state.Auth.email,
        First_name: state.Auth.First_name,
        middle_name:state.Auth.middle_name,
        Last_name: state.Auth.Last_name,
        is_faculty: state.Auth.is_faculty,
        groups:state.Auth.groups,
        email_verified: state.Auth.email_verified,
        Bio: state.Auth.Bio,
        Date_Of_Birth:state.Auth.Date_Of_Birth,

        Sem1: state.Auth.Sem1,
        Sem2: state.Auth.Sem2,
        Sem3: state.Auth.Sem3,
        Sem4: state.Auth.Sem4,
        Sem5: state.Auth.Sem5,
        Sem6: state.Auth.Sem6,
        Sem7: state.Auth.Sem7,
        Sem8: state.Auth.Sem8,
        DeadKT: state.Auth.DeadKT,
        No_Of_DeadKT: state.Auth.No_Of_DeadKT,
        LiveKT: state.Auth.LiveKT,
        No_Of_LiveKT: state.Auth.No_Of_LiveKT,
        Gate_Status: state.Auth.Gate_Status,
        future_options: state.Auth.future_options,
        linkedin_profile: state.Auth.linkedin_profile,
        Resume_profile: state.Auth.Resume_profile,
        Internship: state.Auth.Internship,
        collage_passingYear: state.Auth.collage_passingYear,
        collage_joinig_year: state.Auth.collage_joinig_year,
        i_card_image: state.Auth.i_card_image,
        Country_name: state.Auth.Country_name,
        State_name: state.Auth.State_name,
        Locality_name: state.Auth.Locality_name,
        PostalCode: state.Auth.PostalCode,
        Building_name_And_RoomNumber: state.Auth.Building_name_And_RoomNumber,
        Student_phone_number: state.Auth.Student_phone_number,
        Parent_phone_number: state.Auth.Parent_phone_number,
        Roll_no: state.Auth.Roll_no,
        MhCET: state.Auth.MhCET,
        SSC: state.Auth.SSC,
        HSC: state.Auth.HSC,
        Diploma: state.Auth.Diploma,
        Github_profile: state.Auth.Github_profile,
        Cache_check:state.Auth.Cache_check,
        Affliated_Department:state.Auth.Affliated_Department,

    }
};

export default AuthSlice.reducer;
