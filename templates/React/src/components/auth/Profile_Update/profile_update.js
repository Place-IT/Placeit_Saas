import React, {Component, useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {BasicDetailsU, selectError, selectLogin,SuccessSelector, selectStatus} from "../../../features/UserAuth/AuthSlicer"
import {Basic_info as BasicUserDetail} from "../../../features/UserAuth/BasicInfo";

import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import InputCreator from "../../../CommonFunctions/UniversalForm/custominput";
import UForm from "../../../CommonFunctions/UniversalForm/Uform";
import {Divider, TextField} from "@mui/material";
import basicSuccess from "../../../CommonFunctions/UniversalForm/BasicSuccess";
import {ProfileUpdate} from "../../../features/UserAuth/profileUpdate";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";



export default function  Profile_update (props)  {
    const dispatch = useDispatch();
    const UserDetail = useSelector(BasicDetailsU);
    const Error = useSelector(selectError);

    const [update,setUpdate]=useState(false)
    const[state,setState]= useState({
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

        MhCET:"",
        SSC:"",
        HSC:"",
        Diploma: null,

        MIS_no: null,
        Roll_no:"",
        Sem1: null,
        Sem2: null,
        Sem3: null,
        Sem4: null,
        Sem5: null,
        Sem6: null,
        Sem7: null,
        Sem8: null,
        collage_passingYear: null,
        collage_joinig_year: null,

        Gate_Status: true,
        future_options: null,

        DeadKT: false,
        No_Of_DeadKT: null,
        LiveKT: false,
        No_Of_LiveKT: 0,

        linkedin_profile: null,
        Github_profile:null,
        Affliated_Department:null,
        Internship: "",
    })

    if(UserDetail.Cache_check && update === false)
    {
        setState({...UserDetail})
        setUpdate(true)
    }
    function dispatch_function(ev)
    {
        dispatch(ProfileUpdate(state))
    }

    useEffect(() => {
        logdata("Profile_update","init","  ")
    });


    return (
        <>
            <UpperHoc  redirect="/auth/profile/" Re={true} hard={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div className="mx-2 my-10 flex flex-col justify-center">
                    <div className="px-5 mx-10 max-w-fit border-b-4 text-3xl border-indigo-700 font-bold">
                        Profile Update
                    </div>


                    <div
                        className="m-10 md:mx-20 mx-0 p-5 flex flex-col space-x-4  border-2  p-2 rounded-2xl">

                        <br/>


                        {/*Personal Details*/}
                        <div
                            className="px-5 py-1 max-w-fit border-b-2  border-indigo-300 font-bold">
                            Personal Details
                        </div>
                        <form className="  items-center max-w-full items-center">
                            {/*First-name*/}
                            <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                           htmlFor="inline-full-name">
                                        First-Name :
                                    </label>
                                </div>
                                <div className="md:w-1/3">
                                    <InputCreator
                                        key="First_name" input={{
                                        nolabel:true,
                                        type:"text",
                                        state: state,
                                        setState: setState,
                                        labelText:"First_name",
                                        name:"First_name" }
                                    }/>
                                </div>
                            </div>
                            {/*middle_name*/}
                            <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                           htmlFor="inline-full-name">
                                        Middle-Name :
                                    </label>
                                </div>
                                <div className="md:w-1/3">
                                    <InputCreator
                                        key="middle_name" input={{
                                        nolabel:true,
                                        type:"text",
                                        state: state,
                                        setState: setState,
                                        labelText:"middle_name",
                                        name:"middle_name" }
                                    }/>
                                </div>
                            </div>
                            {/*Last_name*/}
                            <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                           htmlFor="inline-full-name">
                                        Last-Name :
                                    </label>
                                </div>
                                <div className="md:w-1/3">
                                    <InputCreator
                                        key="Last_name" input={{
                                        nolabel:true,
                                        type:"text",
                                        state: state,
                                        setState: setState,
                                        labelText:"Last_name",
                                        name:"Last_name" }
                                    }/>
                                </div>
                            </div>


                            {/*Date_Of_Birth*/}
                            <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                           htmlFor="inline-full-name">
                                        Date-Of-Birth :
                                    </label>
                                </div>
                                <div className="md:w-1/3">
                                    <InputCreator
                                        key="Date_Of_Birth" input={{
                                        nolabel:true,
                                        type:"date",
                                        state: state,
                                        setState: setState,
                                        labelText:"Date_Of_Birth",
                                        name:"Date_Of_Birth" }
                                    }/>
                                </div>
                            </div>
                            {UserDetail.groups.includes("Faculty") === false&&<>

                                {/*Student_phone_number*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Student-Phonenumber :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Date_Of_Birth" input={{
                                            nolabel:true,
                                            type:"tel",
                                            state: state,
                                            setState: setState,
                                            labelText:"Student_phone_number",
                                            name:"Student_phone_number" }
                                        }/>
                                    </div>
                                </div>


                                {/*Parent_phone_number*/}
                            <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                           htmlFor="inline-full-name">
                                        Parent-Phonenumber :
                                    </label>
                                </div>
                                <div className="md:w-1/3">
                                    <InputCreator
                                        key="Parent_phone_number" input={{
                                        nolabel:true,
                                        type:"tel",
                                        state: state,
                                        setState: setState,
                                        labelText:"Parent_phone_number",
                                        name:"Parent_phone_number" }
                                    }/>
                                </div>
                            </div>
                            </>}

                            {/*Bio*/}
                            <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                           htmlFor="inline-full-name">
                                        BIO:
                                    </label>
                                </div>
                                <div className="md:w-1/3">

                                    <textarea id="message" rows="4"
                                                value={state.Bio}
                                              onChange={ev=>basicSuccess(ev,{state,setState,name:"Bio"})}
                                              className="w-full  px-3 py-5 mt-2  focus:border-transparent focus:ring-0"
                                              placeholder="" />


                                    
                                </div>
                            </div>

                            <Divider />


                        </form>
                        <br/>

                        {UserDetail.groups.includes("Faculty") === false &&
                        <>
                            {/*Address*/}
                            <div
                                className="px-5 py-1 max-w-fit border-b-2  border-indigo-300 font-bold">
                                Address
                            </div>
                            <form className="  items-center max-w-full items-center">
                                {/*Building_name_And_RoomNumber*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Building-name And Room-Number :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Building_name_And_RoomNumber" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"Building_name_And_RoomNumber",
                                            name:"Building_name_And_RoomNumber" }
                                        }/>
                                    </div>
                                </div>
                                {/*Locality_name*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            LocalityName :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Locality_name" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"Locality_name",
                                            name:"Locality_name" }
                                        }/>
                                    </div>
                                </div>
                                {/*PostalCode*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Postal Code :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Last_name" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"PostalCode",
                                            name:"PostalCode" }
                                        }/>
                                    </div>
                                </div>
                                {/*State_name*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            State Name :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="State_name" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"State_name",
                                            name:"State_name" }
                                        }/>
                                    </div>
                                </div>
                                {/*Country_name*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Country Name :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Country_name" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"Country_name",
                                            name:"Country_name" }
                                        }/>
                                    </div>
                                </div>
                                <Divider />
                            </form>
                            <br/>

                            {/*Links*/}
                            <div
                                className="px-5 py-1 max-w-fit border-b-2  border-indigo-300 font-bold">
                                Links
                            </div>
                            <form className="  items-center max-w-full items-center">
                                {/*linkedin_profile*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            linkedin-profile :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Building_name_And_RoomNumber" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"linkedin_profile",
                                            name:"linkedin_profile" }
                                        }/>
                                    </div>
                                </div>
                                {/*Github_profile*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Github-profile :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Building_name_And_RoomNumber" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"Github_profile",
                                            name:"Github_profile" }
                                        }/>
                                    </div>
                                </div>

                                <Divider />
                            </form>
                            <br/>

                            {/*Academic*/}
                            <div
                                className="px-5 py-1 max-w-fit border-b-2  border-indigo-300 font-bold">
                                Academic
                            </div>
                            <form className="  items-center max-w-full items-center">
                                {/*MhCET*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            MhCET :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="MhCET" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"MhCET",
                                            name:"MhCET" }
                                        }/>
                                    </div>
                                </div>
                                {/*SSC*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            SSC :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="MhCET" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"SSC",
                                            name:"SSC" }
                                        }/>
                                    </div>
                                </div>
                                {/*HSC*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            HSC :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="HSC" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"HSC",
                                            name:"HSC" }
                                        }/>
                                    </div>
                                </div>
                                {/*Diploma*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Diploma :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="HSC" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"Diploma",
                                            name:"Diploma" }
                                        }/>
                                    </div>
                                </div>
                                <Divider />
                            </form>
                            <br/>

                            {/*Collage*/}
                            <div
                                className="px-5 py-1 max-w-fit border-b-2  border-indigo-300 font-bold">
                                Academic
                            </div>
                            <form className="  items-center max-w-full items-center">
                                {/*MIS_no*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            MIS No :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="MIS_no" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"MIS_no",
                                            name:"MIS_no" }
                                        }/>
                                    </div>
                                </div>
                                {/*Roll_no*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Roll No :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Roll_no" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"Roll_no",
                                            name:"Roll_no" }
                                        }/>
                                    </div>
                                </div>
                                {/*collage_joinig_year*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Collage Joinig Year :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="collage_joinig_year" input={{
                                            nolabel:true,
                                            type:"text",
                                            state: state,
                                            setState: setState,
                                            labelText:"collage_joinig_year",
                                            name:"collage_joinig_year" }
                                        }/>
                                    </div>
                                </div>
                                {/*collage_passingYear*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Collage Passing Year :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="collage_passingYear" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"collage_passingYear",
                                            name:"collage_passingYear" }
                                        }/>
                                    </div>
                                </div>
                                {/*Department*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Department:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">

                                        <select
                                            onChange={ev=>{
                                                setState({...state,Affliated_Department: ev.target.value})
                                            }}
                                            className=" h-full w-full rounded-md"

                                            id="future_options" name="future options" value={state.Affliated_Department}>
                                            <option value="null">   </option>
                                            <option value="1">Department Of Information Technology</option>
                                            <option value="2">Department Of Chemical Engineering</option>
                                            <option value="3">Department Of Computer Science</option>
                                            <option value="4">Department Of Electronics and TelecomnicationsDepartment Of Instrumental</option>
                                            <option value="5">Department Of Mechinical engineering</option>
                                        </select>
                                    </div>
                                </div>



                                <Divider />
                            </form>
                            <br/>
                            {/*CGPA*/}
                            <div
                                className="px-5 py-1 max-w-fit border-b-2  border-indigo-300 font-bold">
                                CGPA
                            </div>
                            <form className="  items-center max-w-full items-center">
                                {/*Sem1*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Sem1:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Sem1" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"Sem1",
                                            name:"Sem1" }
                                        }/>
                                    </div>
                                </div>
                                {/*Sem2*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Sem2:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Sem2" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"Sem2",
                                            name:"Sem2" }
                                        }/>
                                    </div>
                                </div>
                                {/*Sem3*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Sem3:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Sem5" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"Sem3",
                                            name:"Sem3" }
                                        }/>
                                    </div>
                                </div>
                                {/*Sem4*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Sem4:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Sem4" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"Sem4",
                                            name:"Sem4" }
                                        }/>
                                    </div>
                                </div>
                                {/*Sem5*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Sem5:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Sem5" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"Sem5",
                                            name:"Sem5" }
                                        }/>
                                    </div>
                                </div>
                                {/*Sem6*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Sem6 :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Sem1" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"Sem6",
                                            name:"Sem6" }
                                        }/>
                                    </div>
                                </div>
                                {/*Sem7*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Sem7 :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Sem1" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"Sem7",
                                            name:"Sem7" }
                                        }/>
                                    </div>
                                </div>
                                {/*Sem8*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Sem8 :
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="Sem1" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"Sem8",
                                            name:"Sem8" }
                                        }/>
                                    </div>
                                </div>

                                <Divider />
                            </form>
                            <br/>
                            {/*KT*/}
                            <div
                                className="px-5 py-1 max-w-fit border-b-2  border-indigo-300 font-bold">
                                KT
                            </div>
                            <form className="  items-center max-w-full items-center">
                                {/*DeadKT*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Dead-KT:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <input type="checkbox"  checked={state.DeadKT}
                                               className=" border  h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-700 rounded-md"
                                               onChange={ev=>{
                                                   setState({...state,DeadKT: !state.DeadKT})
                                               }}
                                        />

                                    </div>
                                </div>
                                {/*No_Of_DeadKT*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            No Of DeadKT:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="No_Of_DeadKT" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"No_Of_DeadKT",
                                            name:"No_Of_DeadKT" }
                                        }/>
                                    </div>
                                </div>
                                {/*LiveKT*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Live KT:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <input type="checkbox"  checked={state.LiveKT}
                                               className=" border  h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-700 rounded-md"
                                               onChange={ev=>{
                                                   // basicSuccess(ev,{state,setState,name:"Gate_Status"})
                                                   // console.log(ev.target.value)
                                                   setState({...state,LiveKT: !state.LiveKT})
                                               }}
                                        />

                                    </div>
                                </div>
                                {/*No_Of_LiveKT*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            No Of LiveKT:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <InputCreator
                                            key="No_Of_LiveKT" input={{
                                            nolabel:true,
                                            type:"number",
                                            state: state,
                                            setState: setState,
                                            labelText:"No_Of_LiveKT",
                                            name:"No_Of_LiveKT" }
                                        }/>
                                    </div>
                                </div>

                                <Divider />
                            </form>
                            <br/>

                            {/*Future Scope*/}
                            <div
                                className="px-5 py-1 max-w-fit border-b-2  border-indigo-300 font-bold">
                                Future Scope
                            </div>
                            <form className="  items-center max-w-full items-center">
                                {/*Gate_Status*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Gate Status:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <input type="checkbox"  checked={state.Gate_Status}
                                               className=" border  h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-700 rounded-md"
                                               onChange={ev=>{
                                                   // basicSuccess(ev,{state,setState,name:"Gate_Status"})
                                                   // console.log(ev.target.value)
                                                   setState({...state,Gate_Status: !state.Gate_Status})
                                               }}
                                        />
                                    </div>
                                </div>
                                {/*future_options*/}
                                <div className="md:flex md:items-center mb-4 space-x-6 mx-2">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-700 font-semibold md:text-right mb-1 md:mb-0 p-4"
                                               htmlFor="inline-full-name">
                                            Future Options:
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">

                                        <select
                                            onChange={ev=>{
                                                setState({...state,future_options: ev.target.value})
                                            }}
                                            className="h-full w-full rounded-md"
                                            id="future_options" name="future options" value={state.future_options}>
                                            <option value="null">   </option>
                                            <option value="job">Job</option>
                                            <option value="Hs">Higher Studies</option>
                                            <option value="entru">Entrepreneurship</option>
                                        </select>
                                    </div>
                                </div>


                                <Divider />
                            </form>
                            <br/>

                        </>}

                        {Error.error &&  <p className="text-center text-red-700">{Error.error_msg}</p>}


                        <div className="px-5 py-1 flex justify-center  font-bold">
                            <p
                               onClick={dispatch_function}
                               className="px-8 py-2 border-2 border-indigo-700 bg-indigo-700 text-white rounded-full font-bold">
                                  Submit
                            </p>
                        </div>



                    </div>



                </div>

            </UpperHoc>
            </>

    );

}