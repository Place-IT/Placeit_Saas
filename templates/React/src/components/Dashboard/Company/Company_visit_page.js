import React, {useEffect, useRef, useState} from "react";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {selectCompany_list, selectError, selectStatus, SuccessSelector} from "../../../features/company/CompanySlicer";
import {Link, useParams} from "react-router-dom";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import {useDispatch, useSelector} from "react-redux";
import onSelectFile from "../../../CommonFunctions/File_upload";
import {Company_Profile} from "../../../features/company/CompanyProfile";
import {Create_Company_visitng} from "../../../features/company/create_visitng_record";




export default function  Company_Visit_page(props)  {

    useEffect(()=>{
        logdata("Company_Visit_page","init",`Post_Detail init with following props:${props}`)
    },[])
    let { pkId } = useParams();

    const [data,setData]=useState({
        visiting_date:"",
        HRName:"",
        Position:"",
        MinLpa_offered:"",
        MaxLpa_offered:"",
        Description:"",
        Pdf:"",
        company:pkId
    })
    const[call,setCall]= useState(false)
    const myRef = useRef(null);
    const[selectedFile,setSelectedFile]= useState()
    const[selectedFileName,setSelectedFileName]= useState("")
    const [preview, setPreview] = useState()
    const dispatch = useDispatch();
    const cdata = useSelector(selectCompany_list);


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

    if(!call)
    {
        setCall(true)
        dispatch(Company_Profile(pkId))
    }





    function dispatch_function(ev)
    {
        logdata("dispatch_function","init",`dispatch with following state ${data}`)
        dispatch(Create_Company_visitng({
            data:data,
            image:selectedFile,
            name:selectedFileName,
        }))
        logdata("dispatch_function","completed",`dispatch completefd`)
    }



    return (
        <>
            <UpperHoc  redirect={`/dashboard/company_profile/${pkId}/`} Re={true} hard={true}  Status={selectStatus} Error={selectError} Success={SuccessSelector}>
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
                                Company Visiting record
                            </div>

                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Company:
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">
                                <Link to={`/dashboard/company_profile/${pkId}/`}>
                                    <div className="text-3xl md:text-6xl flex justify-center items-center flex-col ">
                                        {`${cdata[0] === undefined ? "sssssssss" :cdata[0].Company_name}`}
                                    </div>
                                </Link>
                            </div>



                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Visiting Date:
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">

                                <div className="w-full mb-4 md:w-1/2">
                                    <input
                                        type="date"
                                        id="date"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "

                                        value={data.visiting_date}
                                        onChange={ev=>setData({...data,visiting_date: ev.target.value})}
                                    />
                                </div>

                            </div>
                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Hr Name:
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">

                                <div className="w-full mb-4 md:w-1/2">
                                    <input
                                        type="text"
                                        id="message"
                                        value={data.HRName}
                                        onChange={ev=>setData({...data,HRName: ev.target.value})}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "

                                    />
                                </div>

                            </div>
                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Position:
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">

                                <div className="w-full mb-4 md:w-1/2">
                                    <input
                                        type="text"
                                        id="message"
                                        value={data.Position}
                                        onChange={ev=>setData({...data,Position: ev.target.value})}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "

                                    />
                                </div>

                            </div>

                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Min Lpa Offered:
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">

                                <div className="w-full mb-4 md:w-1/2">
                                    <input
                                        type="number"
                                        id="message"
                                        value={data.MinLpa_offered}
                                        onChange={ev=>setData({...data,MinLpa_offered: ev.target.value})}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "

                                    />
                                </div>

                            </div>
                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Max Lpa Offered:
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">

                                <div className="w-full mb-4 md:w-1/2">
                                    <input
                                        type="number"
                                        id="message"
                                        value={data.MaxLpa_offered}
                                        onChange={ev=>setData({...data,MaxLpa_offered: ev.target.value})}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "

                                    />
                                </div>

                            </div>

                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Description:
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">

                                <div className="w-full mb-4 md:w-1/2">
                                   <textarea
                                      rows="4"
                                        id="message"
                                        value={data.Description}
                                        onChange={ev=>setData({...data,Description: ev.target.value})}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "

                                    />
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-col ">
                                <div className="text-xl font-bold w-full md:w-1/2 bg-white my-4">
                                    Pdf:
                                </div>
                            </div>
                            {selectedFile &&
                            <>
                                <div className=" w-full md:w-1/3 bg-white rounded p-4 grid place-items-center ">

                                    <embed X_FRAME_OPTIONS='SAMEORIGIN'
                                           src={preview}
                                           className="flex w-full h-72 h-screen" />

                                </div>
                            </>}
                            <div className="flex justify-center items-center flex-col ">
                                <div className="w-full mb-4 md:w-1/2">
                                    <div  onClick={ev=>{
                                        // console.log(myRef)
                                        myRef.current.click();
                                    }}
                                          className="text-md text-blue-600 font-semibold md:text-2xl">Upload
                                        PDF</div>

                                    <input
                                        ref={myRef}
                                        type='file'
                                        onChange={ev=>onSelectFile(ev,update_file)}
                                        style={{display:"none"}}
                                        accept="application/pdf"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "

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

