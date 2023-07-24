import React, {Component, useEffect, useRef, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {BasicDetailsU, selectError, selectLogin,SuccessSelector, selectStatus} from "../../../features/UserAuth/AuthSlicer"
import {Basic_info as BasicUserDetail} from "../../../features/UserAuth/BasicInfo";

import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {ProfileUpdate} from "../../../features/UserAuth/profileUpdate";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import onSelectFile from "../../../CommonFunctions/File_upload";
import {Link} from "react-router-dom";



export default function  Profile_image_update (props)  {

    const dispatch = useDispatch();
    const[selectedFile,setSelectedFile]= useState()
    const[selectedFileName,setSelectedFileName]= useState("")
    const [preview, setPreview] = useState()
    const UserDetail = useSelector(BasicDetailsU);
    const myRef = useRef(null);

    useEffect(() => {

        logdata("Profile_image_update","init","  ")
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    function update_file(setSelectedFile_value,setSelectedFileName_value)
    {
        setSelectedFile(setSelectedFile_value)
        setSelectedFileName(setSelectedFileName_value)
    }

    function dispatch_function(ev)
    {

        if (selectedFile !== undefined)
        {
            logdata("Profile_image_update","info",` dispatched with following data :${{
                "image_update":true,
                "i_card_image":selectedFile,
                name:selectedFileName,
                id:UserDetail.id
            }}`)

            dispatch(ProfileUpdate({
                "image_update":true,
                "i_card_image":selectedFile,
                name:selectedFileName,
                id:UserDetail.id
            }))
        }
    }
    function dispatch_function_delete_image(ev)
    {
            dispatch(ProfileUpdate({
                "image_update":true,
                "i_card_image":null,
                delete:true,
                name:null,
                id:UserDetail.id
            }))
    }
    function cancel(ev)
    {
        myRef.current.value=""
        setSelectedFile(false)
        setSelectedFileName("")
    }


    return (
        <>
            <UpperHoc  redirect="/auth/profile/" Re={true} hard={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div className="m-4 lg:m-10  justify-center">
                    <div className="flex m-4  text-md justify-between">
                        <Link to={`/auth/settings/`}>
                            <div className="flex  flex-row  rounded-full py-2 cursor-pointer" >
                                <p href="#" className=""><i className='bx bxs-chevron-left  lg:text-3xl'></i></p>
                                <p className="lg:text-2xl px-2 border-b-4 border-indigo-800">Back</p>
                            </div>
                        </Link>
                    </div>
                    <div
                        className="px-5 my-4  md:mx-10 mx-auto max-w-fit border-b-4 text-3xl border-indigo-700 font-bold">
                        Image Upload
                    </div>

                </div>

                {/*<input type='file' onChange={ev=>onSelectFile(ev,update_file)} accept="image/*" />*/}
                {/*<br />*/}
                {/*<button onClick={dispatch_function}>Click Me!</button>*/}
                {/*{selectedFile &&  <img src={preview} />}*/}

                <div className="max-w-6xl mx-auto ">
                    <div className=" mt-4 md:mt-20 flex flex-col md:flex-row">
                        <div className="flex px-10 sm:px-20 md:w-1/2">
                            {selectedFile? <img
                                    className="mx-auto object-contain border-2 border-indigo-600  w-60 md:w-80 h-60 md:h-80 rounded-full"
                                    src={preview} />:
                            <>
                                {UserDetail.i_card_image === null?
                                <>
                                    <img alt="" src="/static/img/default-avatar.png"
                                         className="mx-auto object-contain border-2 border-indigo-600  w-60 md:w-80 h-60 md:h-80 rounded-full"/>
                                </>:<>
                                        <img alt="" src={UserDetail.i_card_image}
                                             className="mx-auto object-contain border-2 border-indigo-600  w-60 md:w-80 h-60 md:h-80 rounded-full"/>
                                    </>}

                            </>
                            }

                        </div>
                        <div className="flex flex-col justify-center m-10 flex  md:w-1/2">
                            <ul className=" border-2 border-blue-600 rounded-2xl">
                                <div className="flex justify-center my-4 w-full flex text-black font-semibold  ">
                                    <p className=" md:text-3xl text-xl ">Change Profile picture</p>
                                </div>
                                <div className="justify-center border-b-2 border-blue-600 my-4 w-full flex"></div>
                                <li className="flex justify-center space-x-4 mx-4 my-2">
                                    <div href="#">
                                        {selectedFile?<>
                                            <div  onClick={dispatch_function}
                                                  className="text-md text-blue-600 font-semibold md:text-2xl">Save image as profile picture</div>
                                        </>:<>

                                            <div  onClick={ev=>{
                                                // console.log(myRef)
                                                myRef.current.click();
                                            }}
                                                  className="text-md text-blue-600 font-semibold md:text-2xl cursor-pointer">Upload
                                                Photo</div>
                                        </>}


                                        <input
                                               ref={myRef}
                                               type='file'
                                               onChange={ev=>onSelectFile(ev,update_file)}
                                               style={{display:"none"}}
                                               accept="image/*" />
                                    </div>
                                </li>
                                {!selectedFile &&

                                <li className="flex justify-center space-x-4 mx-4 my-2">
                                    <div href="#"><div onClick={dispatch_function_delete_image} className="text-md text-red-600 font-semibold md:text-2xl cursor-pointer"> Remove
                                        Photo</div></div>
                                </li>
                                }

                                {selectedFile &&
                                <li className="flex justify-center space-x-4 mx-4 my-2">
                                    <div onClick={cancel}><div className="text-md md:text-2xl">cancel</div></div>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </UpperHoc>
        </>
    );

}