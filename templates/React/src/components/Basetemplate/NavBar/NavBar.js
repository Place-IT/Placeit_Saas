import React,{ useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Check_Auth} from "../../../features/UserAuth/AuthCheck";
import {
    BasicDetailsU,
     selectLogin
} from "../../../features/UserAuth/AuthSlicer";
import logo from "../../../assets/images/logo.png";
import {Basic_info} from "../../../features/UserAuth/BasicInfo";
import {Link, useHistory} from "react-router-dom";
import {Avatar} from "@mui/material";
import BottomNavBar from "../BottomNav/BottomNav";
import {logdata} from "../../../CommonFunctions/Logger/Logevents";

export default function NavBar()  {

    const dispatch = useDispatch();
    const Login_state = useSelector(selectLogin);
    const UserDetail = useSelector(BasicDetailsU);
    const [check, setCheck] = useState(false);
    const [cacheDetail, setCachedetail] = useState(false);
    const [mobilemenu, setMobilemenu] = useState(false);
    const [update,setUpdate]=useState(true)
    const history = useHistory()
    let list_of_nav_ele={}



    useEffect(() => {
        logdata("NavBar","info",`You changed the page to: ${location.pathname}`)

        return history.listen((location) => {
            setUpdate(!update)
        })
    },)

    if (check === false) {
        logdata("NavBar","info",`Checking State-${location.pathname}`)
        setCheck(true);
        dispatch(Check_Auth(false))
    }

    if (check === true && Login_state.Login === true && cacheDetail === false) {
        // check === true , Login_state.login === true,Login_state.Login , cacheDetail === false,check === true && Login_state.login === true && cacheDetail === false
        setCachedetail(true);
        logdata("NavBar","info",`Basic info cash initated`)
        dispatch(Basic_info(false))
    }


    //list of nav elemts to display according to user
    if(UserDetail.groups.includes("Faculty") || UserDetail.groups.includes("Head") )
    {
        if(UserDetail.email_verified === false)
        {
            list_of_nav_ele={"/auth/settings/":"Settings"}
        }
        else {
            list_of_nav_ele={"/dashboard/":"Dashboard","/auth/profile/":"Profile","/auth/settings/":"Settings"}
        }

    }
    else
    {
        if(UserDetail.email_verified === false)
        {
            list_of_nav_ele={"/auth/settings/":"Settings"}
        }
        else {
            list_of_nav_ele={"/timeline/":"Feed","/auth/profile/":"Profile","/auth/settings/":"Settings"}
        }


    }


    //dont load nav on this urls
    const dontload_urls=["/auth/","/auth/login/","/auth/signup/","/auth/forgotPassword/",
       ]


        return (
            <>
                <nav className="bg-white  fixed w-full  z-50 ">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex justify-between space-x-12">
                            <div className="flex">
                                <div>
                                    <a href="/" className="flex items-center py-4 px-2">
                                        <img src={logo} alt="Logo" className="h-8"/>
                                    </a>
                                </div>
                            </div>
                            {dontload_urls.includes(window.location.pathname) === false &&
                            <>
                            {Login_state.Login?
                                <>
                                    <div className="hidden md:flex items-center space-x-4">

                                        {
                                            Object.entries(list_of_nav_ele).map((ev,i)=>{
                                                // console.log(ev[0] !== window.location.pathname || window.location.pathname.includes(ev[0]),ev[0] !== window.location.pathname , window.location.pathname.includes(ev[0]),ev[0] )
                                                if(window.location.pathname.includes(ev[0]) )
                                                {
                                                    return <p
                                                        // href={ev[0]}
                                                        className="py-4 px-2 text-indigo-500 border-b-4 border-indigo-500 font-semibold"
                                                        key={i}><Link to={ev[0]}>{ev[1]}</Link></p>
                                                }
                                                else {
                                                    return<p
                                                        // href={ev[0]}
                                                        className="py-4 px-2 text-gray-500 font-semibold hover:text-indigo-500 transition duration-300"
                                                        key={i}><Link to={ev[0]}>{ev[1]}</Link></p>
                                                }
                                            })

                                        }
                                    </div>


                                    <div className="hidden md:flex items-center space-x-8">
                                        <Avatar >{UserDetail.email.charAt(0)}</Avatar>
                                        {UserDetail.email}
                                    </div>
                                </>:<>
                                    <div className="hidden md:flex items-center space-x-8">
                                        <a
                                            href="/auth/login/"
                                            className="py-2 px-8 font-medium text-gray-500 rounded-3xl border-2 border-slate-400 hover:bg-indigo-500 hover:text-white transition duration-300"
                                        >Log In</a
                                        >
                                        <a
                                            href="/auth/signup/"
                                            className="py-2 px-8 font-medium text-gray-500 rounded-3xl border-2 border-slate-400 hover:bg-indigo-500 hover:text-white transition duration-300"
                                        >Sign up</a>
                                    </div>
                                </>}
                            </>}


                            <div className="md:hidden flex items-center">
                                <button className="outline-none mobile-menu-button" onClick={ev=>{
                                    setMobilemenu(!mobilemenu)
                                }}>
                                    <svg
                                        className="w-6 h-6 text-gray-500 hover:text-indigo-500"
                                        x-show="!showMenu"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {dontload_urls.includes(window.location.pathname) === false &&
                    <>
                        {mobilemenu &&
                        <div className="mobile-menu">
                            <ul className="flex flex-col">
                                {Login_state.Login &&
                                <li>
                                    <div className="w-full h-20 flex items-center space-x-4 ">
                                        <div
                                            className=" px-14 py-4 h-10 w-3/12 break-normal md:break-all font-medium dark:text-white">
                                            <Avatar >{UserDetail.email[0].toUpperCase()}</Avatar>
                                        </div>
                                        <div
                                            className="py-4 h-10 w-9/12 break-normal md:break-all font-medium dark:text-white">
                                            <div>{UserDetail.email}</div>

                                        </div>
                                    </div>
                                </li>}

                                {
                                    Object.entries(list_of_nav_ele).map((ev,i)=>{
                                        if(window.location.pathname.includes(ev[0]) )
                                        {
                                            return<><Link to={ev[0]} onClick={ev=>{
                                                setMobilemenu(!mobilemenu)
                                            }}>
                                                <li className="active">
                                                    <p
                                                        href={ev[0]}
                                                        className="block text-white hover:bg-indigo-500 text-sm px-14 py-4 hover:text-white bg-indigo-500 font-semibold"
                                                    >
                                                        {ev[1]}</p
                                                    >
                                                </li></Link>
                                            </>

                                        }
                                        else {
                                            return<><Link to={ev[0]} onClick={ev=>{
                                                setMobilemenu(!mobilemenu)
                                            }}>
                                                <li>
                                                <p
                                                    href={ev[0]}
                                                    className="block font-semibold hover:bg-indigo-500 hover:text-white text-sm px-14 py-4 transition duration-300"
                                                >
                                                    {ev[1]}</p
                                                >
                                            </li>
                                            </Link>
                                            </>

                                        }

                                    })
                                }
                            </ul>
                        </div>
                        }
                    </>}
                </nav>
                <div className="w-full h-20"></div>
                <BottomNavBar />


            </>

        );

}

