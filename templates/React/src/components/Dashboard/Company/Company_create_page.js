import React, {useEffect, useRef, useState} from "react";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {selectError, selectStatus, SuccessSelector} from "../../../features/company/CompanySlicer";
import {Link} from "react-router-dom";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import {useDispatch, useSelector} from "react-redux";
import {Create_Company} from "../../../features/company/Create_Company";
import onSelectFile from "../../../CommonFunctions/File_upload";




export default function  Company_Create(props)  {

    useEffect(()=>{
        logdata("Company_Create","init",`Post_Detail init with following props:${props}`)
    },[])

    const [data,setData]=useState({
        Company_name:"",
        Employers_Website:"",
        })
    const myRef = useRef(null);
    const[selectedFile,setSelectedFile]= useState(undefined)
    const[selectedFileName,setSelectedFileName]= useState("")
    const [preview, setPreview] = useState()
    const dispatch = useDispatch();

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
        //upload image to complete
        logdata("dispatch_function","init",`dispatch with following state ${data}`)
        dispatch(Create_Company({
            data:data,
            image:selectedFile,
            name:selectedFileName,
        }))
        logdata("dispatch_function","completed",`dispatch completefd`)
    }


    return (
        <>
            <UpperHoc  redirect="/dashboard/company_search/" Re={true} hard={true}  Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div>
                    <div className="m-4 lg:m-10 ">
                        <div className="flex m-4  text-md justify-between">
                            <Link to={`/dashboard/company_search/`}>
                                <div className="flex  flex-row  rounded-full py-2 cursor-pointer" >
                                    <p  className=""><i className='bx bxs-chevron-left  lg:text-3xl'></i></p>
                                    <p className="lg:text-2xl px-2 border-b-4 border-indigo-800">Back</p>
                                </div>
                            </Link>
                        </div>
                        <div className="border-2 border-gray-300 m-4 rounded p-4">
                            <div
                                className="px-5 my-8 md:mx-10 mx-auto max-w-fit border-b-4 text-3xl border-indigo-700 font-bold">
                                Company Creation Page
                            </div>

                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Company Name:
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">

                                <div className="w-full mb-4 md:w-1/2">
                                    <input
                                        type="text"
                                        id="message"
                                        value={data.Company_name}
                                        onChange={ev=>setData({...data,Company_name: ev.target.value})}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "

                                    />
                                </div>

                            </div>
                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Company website:
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">

                                <div className="w-full mb-4 md:w-1/2">
                                    <input
                                        type="url"
                                        id="message"
                                        value={data.Employers_Website}
                                        onChange={ev=>setData({...data,Employers_Website: ev.target.value})}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                                    />
                                </div>

                            </div>
                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Company Logo:
                                </div>
                            </div>




                            {selectedFile &&
                            <>

                                <div className="w-full md:w-1/3 bg-white rounded p-4 " style={{
                                    width: "100%",
                                    height: "40vh",
                                    display: "flex",
                                    "justify-content": "center",

                                }}>
                                    <img
                                        src={preview}
                                        alt=" "
                                        style={{height:"100%"}}
                                        className="rounded-xl"/>
                                </div>
                            </>}

                            <div className="flex justify-center items-center flex-col ">
                                <div className="w-64 bg-white text-center p-4">
                                    <div  onClick={ev=>{
                                        myRef.current.click();
                                    }}
                                          className="text-sm p-2  cursor-pointer hover:bg-indigo-700 hover:text-white border-2 rounded-full border-indigo-600 text-blue-600 font-bold md:text-2xl">Upload
                                        Photo</div>
                                    <input
                                        ref={myRef}
                                        type='file'
                                        onChange={ev=>onSelectFile(ev,update_file)}
                                        style={{display:"none"}}
                                        accept="image/*"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                                        placeholder="Enter the Post Expiration date Time"
                                    />
                                </div>
                            </div>
                        </div>
                        <div   className="px-5 py-8 flex justify-center  font-bold" onClick={dispatch_function}>
                            <div
                                className="px-8 py-2 border-2 border-indigo-700 bg-indigo-700 text-white rounded-full font-bold">
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </UpperHoc>
        </>

    );

}

