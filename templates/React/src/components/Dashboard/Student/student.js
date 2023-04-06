import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FetchStudents} from "../../../features/Department/FetchStudents";
import UpperHoc from "../../../CommonFunctions/UpperCLouser/CustomHoc";
import {selectError, selectSResult, selectStatus, SuccessSelector} from "../../../features/Department/StudentSLicer";
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";
import {BasicDetailsU} from "../../../features/UserAuth/AuthSlicer";
import Poster_dialog from "../poster_dialog";



export default function  Student(props)  {
    useEffect(ev=>{
        logdata("Department","init",`Department initated`)
    },[])
    const dispatch = useDispatch();

    const [call,setCall]=useState(false)
    const [open,setOpen]=useState(false)
    const [departments,setDepartments]=useState(window.department_list[0])
    const [year,setYear]=useState(new Date().getFullYear())

    const [first ,setFirst]=useState(false)
    const UserDetail = useSelector(BasicDetailsU);
    const data = useSelector(selectSResult);

    const [search,setSearch]=useState({
        search:"",
    })
    if(!first && UserDetail.Cache_check)
    {
        if(UserDetail.groups.includes("Faculty"))
        {
            setDepartments(UserDetail.Affliated_Department["name"])
            dispatch(FetchStudents([search.search,year,UserDetail.Affliated_Department["name"]]))
        }
        else {
            dispatch(FetchStudents([search.search,year,department_list[0]]))

        }

        setFirst(true)
    }

    const [columnDefs] = useState([
        {field: 'email',display:"Email"},
        { field: 'MIS_no' ,display:"Mis No" },
        { field: 'First_name',display:"First-Name" },
        { field: 'middle_name',display:"Middle-Name" },
        { field: 'Last_name',display:"Last-Name" },

        { field: 'Diploma',display:"Diploma" },
        { field: 'Date_Of_Birth',display:"DOB" },
        { field: 'HSC',display:"HSC" },
        { field: 'SSC',display:"SSC" },
        { field: 'MhCET',display:"MhCet" },
        { field: 'JEE',display:"JEE" },

        { field: 'Building_name_And_RoomNumber',display:"Building-Name And Room-Number" },
        { field: 'Locality_name',display:"Locality-Name" },

        { field: 'Sem1',display:"Sem-1"},
        { field: 'Sem2',display:"Sem-2" },
        { field: 'Sem3',display:"Sem-3" },
        { field: 'Sem4',display:"Sem-4" },
        { field: 'Sem5',display:"Sem-5" },
        { field: 'Sem6',display:"Sem-6" },
        { field: 'Sem7',display:"Sem-7"},
        { field: 'Sem8',display:"Sem-8"},
        { field: 'Github_profile',display:"Github-Profile" },
        { field: 'linkedin_profile',display:"Linkedin-Profile" },
        { field: 'Gate_Status',display:"Gate-Status"},

        { field: 'Internship',display:"Internship" },
        { field: 'Parent_phone_number',display:"Parent-PhoneNumber" },
        { field: 'Parent_phone_number',display:"Parent-PhoneNumber" },
        { field: 'Placed_company_name',display:"Placed company " },
    ])
    const sColumn=[
        { field: 'company_name' ,display:"Company Name"},
        { field: 'offer_letter' ,display:"Offer Letter"},
        // { field: 'visiting_reocrd' },
    ]

    function dispatch_search(ev)
    {
        dispatch(FetchStudents([search.search,year,departments]))
    }
    if(call === true)
    {
        setCall(false)
        dispatch_search()
    }

    window.list_of_student=[]
    window.Company=undefined
    return (
        <>{
            open &&<>
                <Poster_dialog
                handleClose={ev=>{
                setOpen(false)
                }
                }
                />
            </>
        }
            <UpperHoc  Re={false}  Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                <div className="row-span-1 lg:col-span-3 col-span-5">
                    <div className="flex justify-center">
                        <div
                            className="px-5 max-w-fit border-b-4 lg:text-4xl text-2xl border-indigo-700 font-bold"
                        >
                            Students DashBoard
                        </div>
                    </div>
                    <div className="flex flex-row justify-between my-8 " style={{"z-index": "-1"}}>
                        <form className="w-full px-4" onSubmit={ev=>{
                            ev.preventDefault()
                            setCall(true)
                        }}>
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
                                    onChange={ev => {
                                        setSearch({...search, search: ev.target.value})
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
                        {UserDetail.Cache_check=== true && UserDetail.groups.includes("Faculty")&&<>
                            <div className="hidden md:flex flex-row bg-indigo-600 rounded-full px-4 py-2 cursor-pointer"
                                 onClick={ev=>{
                                     setOpen(true)
                                 }}
                            >
                                <p href="#" className="px-2"><i className='bx bx-receipt text-white text-2xl pr-2 '></i></p>
                                <p className="text-2xl text-white px-2 font-bold">Banner</p>
                            </div>

                        {/*<div className="hidden md:flex flex-row bg-indigo-600 rounded-full px-4 py-2 cursor-pointer"*/}

                        {/*>*/}
                        {/*    <p className="px-2"><i className='bx bx-receipt text-white text-md pr-2'></i></p>*/}
                        {/*    <p className="text-sm text-white px-2 font-bold">Banner</p>*/}
                        {/*</div>*/}
                        </>}

                    </div>

                    <div className="flex flex-col md:flex-row justify-between mx-4 -mb-4">
                        <div className="relative inline-flex ">
                            {UserDetail.groups.includes("Head") &&<>
                                <select
                                    className="text-xs md:text-sm font-bold rounded border-2 border-purple-700 text-gray-600 h-10 w-full pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                    name="cars" id="cars" value={departments} onChange={ev=>{
                                    setDepartments(ev.target.value)
                                    setCall(true)
                                }}>
                                    {department_list.map(ev=>{return <option value={ev}>{ev}</option>})}
                                </select>
                            </>}
                        </div>
                        <div className="relative inline-flex my-2 ">
                            <select
                                className=" text-xs md:text-sm font-bold rounded border-2 border-purple-700 text-gray-600 h-10 w-24 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                name="cars" id="cars" value={year} onChange={ev=>{setYear(ev.target.value)
                                setCall(true)
                            }}>
                                {years.map(ev=>{return <option value={ev}>{ev}</option>})}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row-span-3 lg:col-span-3 col-span-5 rounded-2xl  mt-8 overflow-y-scroll">
                    <div>
                        <Paper elevation={3}  style={{width:"fit-content"}}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    {columnDefs.map(ev=>{
                                        return<>
                                            <TableCell align="center"  >
                                                {ev.display}
                                            </TableCell>
                                        </>
                                    })}
                                    {sColumn.map(ev=>{
                                        return<>
                                            <TableCell align="center" >
                                                <p> {ev.display} </p>
                                            </TableCell>
                                        </>
                                    })}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item,index)=>{
                                    // console.log(item)
                                    let a={
                                        name:`${item.First_name} ${item.Last_name}`,
                                        company:[],
                                        image:item.i_card_image
                                    }
                                    let b=<>
                                    <TableRow>
                                        {columnDefs.map((ev,index)=>{
                                            if(index === 0){return <>
                                                <TableCell rowSpan={item.form_responses.length + 1}>
                                                    <a href={`/profile/${item.id}/`}>
                                                        {item.email}
                                                    </a>
                                                </TableCell>
                                            </>}
                                            else
                                            {return <>
                                                <TableCell rowSpan={item.form_responses.length + 1}>
                                                    {item[ev.field]}
                                                </TableCell></>}


                                        })}
                                    </TableRow>
                                    {item.form_responses.map(ev=>{
                                        return<>
                                            <TableRow >
                                                {sColumn.map(ev2=>{
                                                    a.company.push(ev[ev2.field])
                                                    if(ev2.field ==="offer_letter" && ev[ev2.field] !== null )
                                                    {
                                                        return <TableCell><a  className={"no-underline hover:underline text-blue-600"} href={ev[ev2.field]}>Letter</a></TableCell>
                                                    }
                                                    else if(ev2.field ==="offer_letter" && ev[ev2.field] === null ) {
                                                        return <TableCell>not-Uploaded</TableCell>
                                                    }
                                                    return<TableCell><a href={`/dashboard/company_profile/${ev.company}/visitng_record/${ev.visiting_reocrd}/`}>{ev[ev2.field]}</a></TableCell>
                                                })}
                                            </TableRow>
                                        </>})}
                                    </>
                                    if(a.company.length >0)
                                    {
                                        list_of_student.push(a)
                                    }
                                    return b
                                })}



                            </TableBody>
                        </Table>
                        </Paper>
                    </div>


                </div>

            </UpperHoc>

        </>
    );
}