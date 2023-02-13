import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {BasicDetailsU, selectError, selectStatus, SuccessSelector} from "../../../features/UserAuth/AuthSlicer";
import {useDispatch, useSelector} from "react-redux";
import {Logout} from "../../../features/UserAuth/Logout";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";

export default function Settings(props)
{

    const dispatch = useDispatch();
    const User = useSelector(BasicDetailsU);
    useEffect(() => {
        logdata("Settings","init",`initiated with following props:${props}`)
    });

    return<>
        <UpperHoc  redirect="/auth/profile/" Re={true} hard={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>
            <div className="mx-2 my-10 flex flex-col  flex-wrap ">
                <div className="px-5 mx-10 max-w-fit border-b-4 text-3xl border-indigo-700 font-bold">
                    Settings
                </div>

                <div className="flex flex-row flex-wrap md:space-x-12  justify-center">
                <Link to="/auth/settings/profileUpdate/" >
                    <div
                        className=" cursor-pointer w-80 px-5 my-8 py-5 place-items-center flex flex-row justify-center space-x-4 text-indigo-700 border-2 border-gray-200 shadow-lg hover:bg-indigo-700  hover:text-white rounded-2xl"
                    >
                        <i className="bx bx-cog text-6xl"></i>
                        <p  className=" font-bold  text-lg">Profile Update</p>
                    </div>
                </Link>

                <Link to="/auth/settings/profileImage_update/" >
                    <div
                        className="cursor-pointer  w-80 px-5 my-8 py-5 place-items-center flex flex-row justify-center space-x-4 text-indigo-700 border-2 border-gray-200 shadow-lg hover:bg-indigo-700  hover:text-white rounded-2xl"
                    >
                        <i className="bx bx-image-alt text-6xl"></i>
                        <p  className=" font-bold  text-lg">Profile Photo Update</p>
                    </div>
                </Link>

                <Link to="/auth/settings/password_reset/" >
                    <div
                        className=" cursor-pointer w-80 px-5 my-8 py-5 place-items-center flex flex-row justify-center space-x-4 text-indigo-700 border-2 border-gray-200 shadow-lg hover:bg-indigo-700  hover:text-white rounded-2xl"
                    >
                        <i className="bx bx-check-shield text-6xl"></i>
                        <p  className=" font-bold  text-lg">Password update</p>
                    </div>
                </Link>


                    <div
                        onClick={ev=>{
                            dispatch(Logout(false))
                        }}
                        className=" cursor-pointer w-80 px-5 my-8 py-5 place-items-center flex flex-row justify-center space-x-4 text-indigo-700 border-2 border-gray-200 shadow-lg hover:bg-indigo-700  hover:text-white rounded-2xl"
                    >
                        <i className="bx bx-check-shield text-6xl"></i>
                        <p  className=" font-bold  text-lg">Logout</p>
                    </div>

                </div>
            </div>
        </UpperHoc>
    </>
}
