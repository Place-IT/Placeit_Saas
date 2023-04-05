import React, {Component, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {
    selectCompany_list,
    selectCompany_visitng_list,
    selectError,
    selectStatus,
    SuccessSelector
} from "../../../features/company/CompanySlicer";
import {Company_Profile} from "../../../features/company/CompanyProfile";
import errorRedirect from "../../../CommonFunctions/Error_controlReact/error_redirect";
import {Compnay_visitng_record} from "../../../features/company/Visitng_record";
import {Link, useRouteMatch} from "react-router-dom";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import Empat from "../../../assets/images/undraw_Active_support_re_b7sj.png";
import {BasicDetailsU} from "../../../features/UserAuth/AuthSlicer";
import {DeleteCompany} from "../../../features/company/DeleteCompany";


export default function  Company_profile (props)  {
    useEffect(ev=>{
        logdata("Company_profile","init",`Company initated`)
    },[])
    let { pkId } = useParams();
    const [re,setRe]=useState(true)
    const ss2=useSelector(SuccessSelector)
    let match = useRouteMatch();
    const dispatch = useDispatch();
    const [search,setSearch]=useState({first:false,seacond:false,});

    const data = useSelector(selectCompany_list);
    const UserDetail = useSelector(BasicDetailsU);
    const success = useSelector(SuccessSelector);
    const visitng_list = useSelector(selectCompany_visitng_list);


    if(search.first === false)
    {
        logdata("Company_profile search first","info",`first search called`)
        setSearch({...search,first: true})
        dispatch(Company_Profile(pkId))
    }
    if(search.first && !search.seacond  && success.profile_fetch_success )
    {
        if(data.length === 0)
        {

            errorRedirect()
        }
        else
        {
            setSearch({...search,seacond: true})
            dispatch(Compnay_visitng_record({id:pkId}))
        }
    }

    function Delete()
    {
       dispatch(DeleteCompany(pkId))
    }

    return (
        <>
            <UpperHoc  Re={re} redirect={"/dashboard/company_search/"}  hard={re}   Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div>
                <div className="m-4 lg:m-10 ">
                    <div className="flex m-4  text-md justify-between">
                        <Link to={`/dashboard/company_search/`}>
                            <div className="flex  flex-row  rounded-full py-2 cursor-pointer">
                                <p href="#" className=""><i className='bx bxs-chevron-left  lg:text-3xl'></i></p>
                                <p className="lg:text-2xl px-2 border-b-4 border-indigo-800">Back</p>
                            </div>
                        </Link>
                        {UserDetail.Cache_check=== true && UserDetail.groups.includes("Head")&&<>
                            <div
                                onClick={ev=>{
                                    Delete()
                                }}
                                className="flex flex-row bg-red-600 rounded-full px-2 text-white text-sm md:text-xl md:px-4 cursor-pointer font-bold py-2 text-center">
                                <p href="#" className="px-2"><i className='bx bx-task-x text-white text-xl md:text-3xl'></i></p>
                                <p className="text-md md:text-2xl text-white md:px-2 font-bold">Delete</p>
                            </div>

                        </> }

                    </div>

                    <div
                        className=" border-2  relative space-y-3 md:space-y-0  rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto bg-gray-200">

                        {data.map(ev=>{

                            return<>
                                <div className="flex flex-col md:flex-row">
                                    <div className=" w-full md:w-1/3 bg-white rounded p-4 grid place-items-center ">

                                        <img
                                            src={ev.Company_logo === null?"https://janak27.github.io/placeitui/img/Jio-Logo%206.png":ev.Company_logo}
                                            alt="tailwind logo" className="rounded-xl"/>

                                    </div>
                                    <div className="w-full md:w-2/3  flex flex-col space-y-2 p-3 ">
                                        <h3 className=" font-semibold text-gray-800 md:text-3xl text-xl">{ev.Company_name}</h3>
                                        <a href={ev.Employers_Website} className="flex flex-row font-medium text-blue-800 cursor-pointer break-words">
                                            <i className='bx bx-link text-2xl'></i>
                                            <p className="text-xl">
                                                {ev.Employers_Website}
                                            </p>
                                        </a>
                                    </div>
                                </div>



                            </>
                        })}
                        {UserDetail.Cache_check=== true && UserDetail.groups.includes("Head")&&<>
                            <div className="flex flex-row space-x-4  justify-end">
                                <Link to={`/dashboard/company_visiting_create/${pkId}/`}>
                                    <div
                                        className="flex flex-row bg-indigo-600 rounded-full px-2 text-white text-sm md:text-xl md:px-4 cursor-pointer font-bold py-2 text-center">
                                        <p  className="md:px-1"><i className="bx bx-plus-circle "></i></p>
                                        <p className="px-1">Create</p>
                                    </div>
                                </Link>
                            </div>
                        </>}

                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 px-1 md:py-2">
                                <p className="font-semibold text-gray-800 md:text-2xl text-xl"> Previous Visits</p>
                            </div>
                        </div>

                        <div className="flex flex-col ">
                            {visitng_list.length === 0?<>
                                <div className="flex ">
                                    <img src={Empat} alt=""/>
                                </div>
                            </>:<>
                                {visitng_list.map(ev=>{

                                    return<>
                                        <Link to={`${match.url}visitng_record/${ev.id}/`}>
                                            <div className="flex flex-row justify-between p-2 bg-white rounded w-full my-2">
                                                <p href="./companyhr.html" className="font-semibold text-gray-800 text-xl">{ev.HRName}</p>
                                                <p href="" className="font-semibold text-gray-800 text-xl">{ev.visiting_date}</p>
                                            </div>
                                        </Link>
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