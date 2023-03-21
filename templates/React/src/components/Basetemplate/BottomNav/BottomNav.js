import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {BasicDetailsU} from "../../../features/UserAuth/AuthSlicer";
// import boxixonscss from "./../../../common_css/all.min.css"

export default function BottomNavBar(props)
{
    const [value, setValue] = React.useState('recents');
    const UserDetail = useSelector(BasicDetailsU);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let navlink=[
        {name:"College",i_tag:"text-2xl bx bxs-graduation",url_include:"college",url:"/dashboard/college/"},
        {name:"Department",i_tag:"text-2xl bx bx-group",url_include:"department",url:"/dashboard/department/"},
        {name:"Company",i_tag:"text-2xl bx bxs-component",url_include:"company",url:"/dashboard/company_search/"},
        {name:"Student",i_tag:"text-2xl bx bx-user-circle",url_include:"student",url:"/dashboard/student_search/"},
        {name:"Post",i_tag:"text-2xl bx bx-add-to-queue",url_include:"post",url:"/dashboard/post_list/"},
    ]

    if( UserDetail.groups.includes("Head") )
    {
         navlink=[
            {name:"College",i_tag:"text-2xl bx bxs-graduation",url_include:"college",url:"/dashboard/college/"},
            {name:"Department",i_tag:"text-2xl bx bx-group",url_include:"department",url:"/dashboard/department/"},
            {name:"Company",i_tag:"text-2xl bx bxs-component",url_include:"company",url:"/dashboard/company_search/"},
            {name:"Student",i_tag:"text-2xl bx bx-user-circle",url_include:"student",url:"/dashboard/student_search/"},

        ]
    }

    if(["/dashboard/"].some(ev=>window.location.pathname.includes((ev))))
    {


        return<>
            <div className="md:hidden fixed bottom-0 z-[100] " style={{"z-index":100}}>
                <div
                    className="bg-white w-full  h-16 px-6 py-2 flex justify-between text-gray-font fixed bottom-0 shadow-lg z-40 border-t border-gray-99">

                    {navlink.map(ev=>{

                        return<>
                            <p >
                                <Link to={ev.url}>
                                    <span
                                        className="px-2 py-1 cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm  flex flex-col items-center text-center text-primary">
                                          <i className={ev.i_tag}>
                                          </i>
                                        {window.location.pathname.includes(ev.url_include)?<>
                                            <span className="mx-1 font-roboto">{ev.name}</span></>:<></>}
                                    </span>
                                </Link>
                            </p>
                        </>
                    })}
                </div>
            </div>
        </>
    }
    else
    {
        return <></>
    }

}