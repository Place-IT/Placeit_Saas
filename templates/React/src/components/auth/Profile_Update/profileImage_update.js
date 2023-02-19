import React, {Component, useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {BasicDetailsU, selectError, selectLogin,SuccessSelector, selectStatus} from "../../../features/UserAuth/AuthSlicer"
import {Basic_info as BasicUserDetail} from "../../../features/UserAuth/BasicInfo";

import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {ProfileUpdate} from "../../../features/UserAuth/profileUpdate";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import onSelectFile from "../../../CommonFunctions/File_upload";



export default function  Profile_image_update (props)  {

    const dispatch = useDispatch();
    const[selectedFile,setSelectedFile]= useState()
    const[selectedFileName,setSelectedFileName]= useState("")
    const [preview, setPreview] = useState()
    const UserDetail = useSelector(BasicDetailsU);

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

    return (
        <>
            <UpperHoc  redirect="/auth/profile/" Re={true} hard={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <input type='file' onChange={ev=>onSelectFile(ev,update_file)} accept="image/*" />
                <br />
                <button onClick={dispatch_function}>Click Me!</button>
                {selectedFile &&  <img src={preview} />}
            </UpperHoc>
        </>
    );

}