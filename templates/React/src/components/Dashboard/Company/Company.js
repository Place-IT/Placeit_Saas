import React, {useEffect, useState} from "react";
import {selectCompany_list, selectError, selectStatus, SuccessSelector } from "../../../features/company/CompanySlicer";
import {useDispatch, useSelector} from "react-redux";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {Company_Search} from "../../../features/company/Company_Search";
import {Link} from "react-router-dom";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import TableChartIcon from '@mui/icons-material/TableChart';
import abc from "./../../../assets/images/undraw_Active_support_re_b7sj.png"
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/lab";
import AddIcon from '@mui/icons-material/Add';
import {Fab} from "@mui/material";
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";
import {BasicDetailsU} from "../../../features/UserAuth/AuthSlicer";

class StyledSpeedDial extends React.Component {
    render() {
        return null;
    }
}

StyledSpeedDial.propTypes = {
    hidden: PropTypes.any,
    icon: PropTypes.element,
    ariaLabel: PropTypes.string,
    direction: PropTypes.any,
    children: PropTypes.node
};
export default function  Company(props)  {

    useEffect(ev=>{
        logdata("Company","init",`Company initated`)
    },[])

    const dispatch = useDispatch();
    const data = useSelector(selectCompany_list);
    const ss2=useSelector(SuccessSelector)
    const UserDetail = useSelector(BasicDetailsU);
    const [re,setRe]=useState(false)
    const [search,setSearch]=useState({
        search:"",
        first_search:false
    })
    const [state,setState]=useState({
        Company_name:"",
        Employers_Website:"",
    })


    if(!search.first_search )
    {
        logdata("Company","info",`first search initated`)
        setSearch({...search,first_search:!search.first_search})
        dispatch(Company_Search(search))
    }

    function dispatch_search(ev)
    {
        logdata("dispatch_search","init",`dispatch with following state ${state}`)
        ev.preventDefault()
        setRe({re:false})
        dispatch(Company_Search(search))
        logdata("dispatch_search","completed",`open completefd`)
    }


     return (
        <>
        <UpperHoc  Re={re} redirect={"/dashboard/company_search/"}  hard={re} Status={selectStatus} Error={selectError} Success={SuccessSelector}>
            <div className="row-span-1 lg:col-span-3 col-span-5">
                <div className="flex justify-center mb-8">
                    <div
                        className="px-5 max-w-fit border-b-4 lg:text-4xl text-2xl border-indigo-700 font-bold"
                    >
                        Company DashBoard
                    </div>
                </div>
                <div className="flex flex-row justify-between my-8 " style={{"z-index": "-1"}}>
                    <form class="w-full px-4" onSubmit={dispatch_search}>
                        <label
                            htmlFor="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only"
                        >Search</label
                        >
                        <div className="relative">
                            <div
                                className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Search the students "
                                required=""
                                value={search.search}
                                onChange={ev=>{
                                    setSearch({...search,search:ev.target.value})
                                }}
                            />
                            <button
                                type="submit"
                                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                            onClick={dispatch_search}
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex mx-4 space-x-4 justify-end" style={{"z-index": "-1"}}>
                    {UserDetail.Cache_check=== true && UserDetail.groups.includes("Head")&&<>
                    <Link to={`/dashboard/company_create/`}>
                        <div
                            className="flex flex-row bg-indigo-600 rounded-lg text-white text-sm md:text-xl cursor-pointer">
                            <a href="#" className="pl-2 pt-2"><i className="bx bx-plus-circle"></i></a>
                            <p className="p-2 font-bold ">Create Company</p>
                        </div>
                    </Link>
                    </>}
                    <Link to={`/dashboard/companyVisitStats/`}>
                        <div
                            className="flex flex-row bg-indigo-600 rounded-lg text-white text-sm md:text-xl cursor-pointer">
                            <a href="#" className="pl-2 pt-2"><i className="bx bx-note"></i></a>
                            <p className="p-2 font-bold ">Compnay Stats</p>
                        </div>
                    </Link>

                </div>

            </div>

            <div className="row-span-3 lg:col-span-3 col-span-5 rounded-2xl mt-4 "
            >
                <div className="flex flex-row flex-wrap">
                    {data.length > 0?<>
                        {data.map(ev=>{

                            return<>
                                <Link to={`/dashboard/company_profile/${ev.id}/`}>
                                    <div
                                        className="cursor-pointer sm:w-72 px-5 m-4 py-5 place-items-center flex flex-row justify-center text-indigo-700 border-2 border-gray-200 shadow-lg hover:bg-indigo-700 hover:text-white rounded-xl w-[84vw]"
                                    >
                                        <div className="block relative p-4" style={{"z-index": "10"}}>
                                            <img
                                                alt="Photo by aldi sigun on Unsplash"
                                                src={ev.Company_logo === null?"https://janak27.github.io/placeitui/img/Jio-Logo%206.png":ev.Company_logo}
                                                className="object-cover rounded-full h-20 w-20 bg-white p-1"
                                            />
                                        </div>
                                        <p className="flex">
                                            <p className="font-bold text-lg">{ev.Company_name}</p>
                                        </p>
                                    </div>
                                </Link>
                            </>
                        })}
                    </>:<>
                    <p>

                        <div className="flex flex-col md:flex-row">
                            <div
                                className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                                <h1 className="text-4xl font-medium leading-none md:text-6xl text-violet-800" >
                            No company Profile created yet.
                        </h1>
                      </div>
                    <div class=" flex ">
                        <img src={abc} alt=""/>
                      </div>
                  </div>
                    </p>
                    </>}

                </div>
            </div>
        </UpperHoc>
        </>
    );

}