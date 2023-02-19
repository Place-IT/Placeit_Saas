import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {BasicDetailsU} from "../../features/UserAuth/AuthSlicer";


export default function  Dashboard_index (props)  {

    const UserDetail = useSelector(BasicDetailsU);


    let navlink=[
        {name:"College",i_tag:"text-2xl bx bxs-graduation",url_include:"college",url:"/dashboard/college/"},
        {name:"Department",i_tag:"text-2xl bx bx-group",url_include:"department",url:"/dashboard/department/"},
        {name:"Company",i_tag:"text-2xl bx bxs-component",url_include:"company", url:"/dashboard/company_search/"},
        {name:"Student",i_tag:"text-2xl bx bx-user-circle",url_include:"student",url:"/dashboard/student_search/"},
        {name:"Post",i_tag:"text-2xl bx bx-add-to-queue",url_include:"post",     url:"/dashboard/post_list/"},
    ]
    if(UserDetail.groups.includes("Head") )
    {
        navlink=[
            {name:"College",i_tag:"text-2xl bx bxs-graduation",url_include:"college",url:"/dashboard/college/"},
            {name:"Department",i_tag:"text-2xl bx bx-group",url_include:"department",url:"/dashboard/department/"},
            {name:"Company",i_tag:"text-2xl bx bxs-component",url_include:"company", url:"/dashboard/company_search/"},
            {name:"Student",i_tag:"text-2xl bx bx-user-circle",url_include:"student",url:"/dashboard/student_search/"},
        ]
    }

    return (
        <>
            {(window.location.href.search("company_profile") === -1 && window.location.href.search("post_detail") === -1 ) ?
            <div className="justify-center items-center  mt-2 ml-3 ">
                <div className="grid grid-rows-4 grid-cols-4 gap-6 gap-y-4 h-screen">
                    <div className="hidden lg:block row-span-3 h-screen">
                        <div
                            className="border-2 border-grey-100 flex flex-col justify-between py-4 px-3 rounded">
                            <div className="flex-grow">
                                <div className="p-4">
                                    <ul className="space-y-0">
                                        <li>
                                            {navlink.map(ev=>{

                                                return<>
                                                    <Link to={ev.url}>
                                                        <div
                                                            href=""
                                                            className={` m-4  flex items-center ${window.location.pathname.includes(ev.url_include)?'bg-indigo-600 text-white':'hover:text-white'}  hover:bg-indigo-600  rounded-xl  text-sm text-black-300 py-2 px-5`}
                                                        >
                                                            <i className={ev.i_tag}></i>
                                                            <p className="text-xl">{ev.name}</p>
                                                        </div>
                                                    </Link>

                                                </>
                                          })}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {props.children}

                </div>

            </div>:<>

                    {props.children}
                </>
            }


            <div className="h-7 row-span-3">

            </div>
        </>

    );

}