import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetUsers} from "../../../features/company/get_placed_user";
import ReadMoreReact from 'read-more-react';
import {useParams} from "react-router";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {
    selectCompany_list,
    selectError,
    selectStatus,
    SuccessSelector, User_list,
    SelectCompnay_visitng_record
} from "../../../features/company/CompanySlicer";
import {Company_Profile} from "../../../features/company/CompanyProfile";
import {Link} from "react-router-dom";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import {Compnay_visitng_record} from "../../../features/company/Visitng_record";
import Empat from "../../../assets/images/undraw_Active_support_re_b7sj.png";

export default function  Visiting_profile (props)  {
    useEffect(ev=>{
        logdata("Visiting_profile","init",`Visiting_profile initated`)
    },[])

    let { vr,pkId } = useParams();
    const [fet,setFet]=useState(false)

    const dispatch = useDispatch();
    const Success = useSelector(SuccessSelector);
    const cvr = useSelector(SelectCompnay_visitng_record);
    const User_list_ = useSelector(User_list);
    const data = useSelector(selectCompany_list);

    if(!fet)
    {
        setFet(true)
        dispatch(Company_Profile(pkId))
        dispatch(Compnay_visitng_record(vr))
        dispatch(GetUsers(vr))
    }
    console.log(cvr)

    return (
        <>
            <UpperHoc  Re={false}   Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div>
                <div className="m-4 lg:m-10 ">

                    <div className="flex m-4  text-md justify-between">
                        <Link to={`/dashboard/company_profile/${pkId}/`}>
                            <div className="flex  flex-row  rounded-full py-2 cursor-pointer" >
                                <p href="#" className=""><i className='bx bxs-chevron-left  lg:text-3xl'></i></p>
                                <p className="lg:text-2xl px-2 border-b-4 border-indigo-800">Back</p>
                            </div>
                        </Link>
                        {/*<div className="hidden md:flex flex-row  bg-indigo-600 rounded-full px-4 py-2 cursor-pointer">*/}
                        {/*    <p href="#" className="px-2"><i className='bx bx-plus-circle text-white text-3xl'></i></p>*/}
                        {/*    <p className="text-2xl text-white px-2 font-bold">Create</p>*/}
                        {/*</div>*/}
                    </div>

                    <div className=" border-2  relative space-y-3 md:space-y-0  rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto bg-gray-200">
                        {Success.profile_fetch_success === true  && Success.cvr_fetch=== true && <>
                        <div className="flex flex-col md:flex-row">

                            <div className=" w-full md:w-1/3 bg-white rounded p-4 grid place-items-center ">
                                <img
                                    src={data[0].Company_logo === null?"https://janak27.github.io/placeitui/img/Jio-Logo%206.png":data[0].Company_logo}
                                    alt="tailwind logo" className="rounded-xl"/>
                            </div>
                            <div className="w-full md:w-2/3  flex flex-col  space-y-2 p-3 ">
                                <h3 className=" font-semibold text-gray-800 md:text-3xl text-xl">{data[0].Company_name}</h3>
                                <h3 className=" font-semibold text-gray-800 md:text-3xl text-xl">{cvr[0].String_repr}</h3>

                                <a href={data[0].Employers_Website} className="flex flex-row font-medium text-blue-800 cursor-pointer break-words">
                                    <i className='bx bx-link text-2xl'></i>
                                    <p className="text-xl">
                                        {data[0].Employers_Website}
                                    </p>
                                </a>
                            </div>

                        </div>
                        </>}
                        {Success.cvr_fetch=== true &&<>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/3 px-2 py-2">
                                    <div className="p-4 flex flex-row">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                             style={{fill: "rgba(0, 0, 0, 1)"}}>
                                            <path
                                                d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z">
                                            </path>
                                            <path
                                                d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z">
                                            </path>
                                        </svg>
                                        <p className="font-semibold text-gray-800 mx-2 text-base">
                                            {cvr[0].HRName}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white rounded w-full md:w-2/3  flex flex-col md:-mt-10  p-3 ">
                                    <div className="flex justify-items-start mb-2">
                                        <div className="px-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24"
                                                 style={{fill: "rgba(0, 0, 0, 1)"}}>
                                                <path
                                                    d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z">
                                                </path>
                                                <path
                                                    d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div className="px-4">
                                            <h4>{cvr[0].visiting_date}</h4>
                                        </div>
                                    </div>
                                    <div className="px-4">
                                        <h4>{cvr[0].Position}</h4>
                                    </div>
                                    <div className=" flex justify-items-start mb-2">
                                        <div className="px-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24"
                                                 style={{fill: "rgba(0, 0, 0, 1)"}}>
                                                <path
                                                    d="M12 15c-1.84 0-2-.86-2-1H8c0 .92.66 2.55 3 2.92V18h2v-1.08c2-.34 3-1.63 3-2.92 0-1.12-.52-3-4-3-2 0-2-.63-2-1s.7-1 2-1 1.39.64 1.4 1h2A3 3 0 0 0 13 7.12V6h-2v1.09C9 7.42 8 8.71 8 10c0 1.12.52 3 4 3 2 0 2 .68 2 1s-.62 1-2 1z">
                                                </path>
                                                <path
                                                    d="M5 2H2v2h2v17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4h2V2H5zm13 18H6V4h12z"></path>
                                            </svg>
                                        </div>

                                        {cvr[0].MaxLpa_offered === cvr[0].MinLpa_offered ? <>
                                            <div className="px-4">
                                                <h4>{cvr[0].MinLpa_offered}</h4>
                                            </div>
                                        </>:<>
                                            <div className="px-4">
                                                <h4>{cvr[0].MinLpa_offered} - {cvr[0].MaxLpa_offered}</h4>
                                            </div>
                                        </>}

                                    </div>
                                    <div className=" flex justify-items-start mb-2">
                                        <div className="px-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}>
                                                <path
                                                    d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z"></path>
                                                <path
                                                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z"></path>
                                            </svg>
                                        </div>
                                        {cvr[0].Pdf !== null && <>
                                            <div className="px-4">
                                                <a href={cvr[0].Pdf}>Job-description.pdf</a>
                                            </div>
                                        </>}
                                    </div>

                                    <div className="mx-6 flex justify-items-start mb-2">
                                        <p className="text-gray-600 font-semibold">
                                            <ReadMoreReact text={cvr[0].Description}
                                                           min={40}
                                                           ideal={50}
                                                           max={90}
                                                           readMoreText={"....read more"}/>

                                        </p>
                                    </div>
                                </div>
                            </div>

                        </>}

                        <div className="flex flex-col ">
                            {User_list_.length === 0?<>
                                <div className="flex ">
                                    <img src={Empat} alt=""/>
                                </div>
                            </>:<>
                                {User_list_.map(ev=>{
                                    return<>
                                        <div className="flex md:flex-row flex-col justify-between p-2 bg-white rounded w-full my-2">
                                            <a href={`/profile/${ev.User}/`} className={"no-underline hover:underline text-blue-600"}>
                                                <p>{ev.User_email}</p>
                                            </a>

                                            <a href={ev.offer_letter} className={"no-underline hover:underline text-blue-600"}>
                                                <p >letter</p>
                                            </a>
                                        </div>
                                    </>
                                })}
                                </>}


                        </div>

                    </div>

                </div>

                </div>

            </UpperHoc>
        </>

    );

}