import React, {useEffect, useState} from "react";
import {Divider} from "@mui/material";
import {Create_Company} from "../../features/company/Create_Company";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../../app/store";
import {DialogSlice, selectState} from "../../features/dialogSlicer";
import Post_card from "./dialog_for_post";
import {selectError, selectStatus, SuccessSelector} from "../../features/timeline/Timelineslicer";
import UpperHoc from "../../CommonFunctions/UpperCLouser/CustomHoc";
import ErrorBoundary from "../../CommonFunctions/Error_controlReact/ErrorBoundary";
import {logdata} from "../../CommonFunctions/Logger/Logevents";
import {Link} from "react-router-dom";
import ReadMoreReact from "read-more-react";
import {selectLogin} from "../../features/UserAuth/AuthSlicer";
import { RWebShare } from "react-web-share";

export default function  TimelineCard(props)
{
    const Login_state = useSelector(selectLogin);
    const Dialog_state = useSelector(selectState);
    const [ar,setAr]=useState(false)
    const [display,setDisplay]=useState(false)
    useEffect(()=>{
        logdata("TimelineCard","init",`TimelineCard`)
    },[])

    if(!Dialog_state && display )
    {
        setDisplay(false)
    }
    function Accept_callback(ev)
    {
        logdata("TimelineCard Accept_callback","info",`Accept_callback`)
        store.dispatch(DialogSlice.actions.dialogState())
        setDisplay(true)
        setAr(true)
    }
    function Reject_callback(ev)
    {
        logdata("TimelineCard Reject_callback","info",`Reject_callback`)
        store.dispatch(DialogSlice.actions.dialogState())
        setDisplay(true)
        setAr(false)
    }
    // console.log(props,display)
    // console.log(props.data.is_user_eligible["final"])
    return<>
        <UpperHoc  redirect="/timeline/" Re={true} hard={true} Status={selectStatus} Error={selectError} Success={SuccessSelector}>

        {display && <>
        <ErrorBoundary component_name={"Post_card"}>
            <Post_card  ar={ar}  id={props.data.id} questions={props.data.questions_set} tittle={props.data.Company_name} />
        </ErrorBoundary>
        </>}
        <div className="flex justify-center my-4">
            <div
                className=" shadow-lg bg-white max-w-lg mx-4  border-slate-700 p-6 rounded-2xl "
            style={{"box-shadow":"rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px"}}
            >
             <div className="w-full flex  items-start justify-start divide-y flex-col ">
                <div className="flex items-center">
                    {props.data.Originator_i_card_image === null?<>
                        <img className="w-10 h-10 rounded-full mr-4" src={`/static/img/default-avatar.png`}
                             alt="originator_avtar" /></>:<>
                        <img className="w-10 h-10 rounded-full mr-4" src={`/media/${props.data.Originator_i_card_image}`}
                             alt="originator_avtar" />
                    </>}

                        <div className="text-sm">
                            <a href={`/profile/${props.data.Originator_id}/`}>
                                <p className="text-gray-900 leading-none">{props.data.Originator_email}</p>
                            </a>
                            <p className="text-gray-600">{props.data.Creation_Date.substring(0, 10)}  </p>
                        </div>
                </div>
                <Divider />
             </div>
                <div className={"w-full flex items-center justify-center overflow-hidden"} style={{"max-height":"50vh","min-height":"30vh"}}>
                    <a href="">
                        <img
                            className="rounded-t-lg"
                            src= {props.data.Company_image}
                            alt=""
                        />
                    </a>
                </div>
                <div className="p-4">
                    <h5  className="text-black-900 text-xl font-bold mx-4 m-3">{props.data.Visitng_record.company.Company_name}</h5>
                    <div className="mx-4 flex justify-items-start mb-2">
                        <div className="px-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                style={{fill: "rgba(0, 0, 0, 1)"}}
                            >
                                <path
                                    d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"
                                ></path>
                                <path
                                    d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"
                                ></path>
                            </svg>
                        </div>
                        <div className="px-4">
                            <h4>{props.data.Visitng_record.visiting_date}</h4>
                        </div>
                    </div>
                    <div className="mx-4 flex justify-items-start mb-2">
                        <div className="px-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                style={{fill: "rgba(0, 0, 0, 1)"}}
                            >
                                <path
                                    d="M12 15c-1.84 0-2-.86-2-1H8c0 .92.66 2.55 3 2.92V18h2v-1.08c2-.34 3-1.63 3-2.92 0-1.12-.52-3-4-3-2 0-2-.63-2-1s.7-1 2-1 1.39.64 1.4 1h2A3 3 0 0 0 13 7.12V6h-2v1.09C9 7.42 8 8.71 8 10c0 1.12.52 3 4 3 2 0 2 .68 2 1s-.62 1-2 1z"
                                ></path>
                                <path
                                    d="M5 2H2v2h2v17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4h2V2H5zm13 18H6V4h12z"
                                ></path>
                            </svg>
                        </div>
                        <div className="px-4">
                            <h4>
                                {props.data.Visitng_record.MaxLpa_offered === props.data.Visitng_record.MinLpa_offered ?<>
                                    {props.data.Visitng_record.MaxLpa_offered.split('.')[0]}
                                </>:<>
                                    {props.data.Visitng_record.MinLpa_offered.split('.')[0]} - {props.data.Visitng_record.MaxLpa_offered.split('.')[0]}
                                </>}
                                LPA</h4>
                        </div>
                    </div>
                    <div className="mx-4 flex justify-items-start mb-2">
                        <div className="px-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                style={{fill: "rgba(0, 0, 0, 1)"}}
                            >
                                <path
                                    d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"
                                ></path>
                                <path
                                    d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"
                                ></path>
                            </svg>
                        </div>
                        <div className="px-4">
                            <h4>{props.data.no_of_user_enroled} Students</h4>
                        </div>
                    </div>
                    <div className="mx-4 flex justify-items-start mb-2">
                        <div className="px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M20.92 2.38A15.72 15.72 0 0 0 17.5 2a8.26 8.26 0 0 0-6 2.06Q9.89 5.67 8.31 7.27c-1.21-.13-4.08-.2-6 1.74a1 1 0 0 0 0 1.41l11.3 11.32a1 1 0 0 0 1.41 0c1.95-2 1.89-4.82 1.77-6l3.21-3.2c3.19-3.19 1.74-9.18 1.68-9.43a1 1 0 0 0-.76-.73zm-2.36 8.75L15 14.67a1 1 0 0 0-.27.9 6.81 6.81 0 0 1-.54 3.94L4.52 9.82a6.67 6.67 0 0 1 4-.5A1 1 0 0 0 9.39 9s1.4-1.45 3.51-3.56A6.61 6.61 0 0 1 17.5 4a14.51 14.51 0 0 1 2.33.2c.24 1.43.62 5.04-1.27 6.93z"></path><circle cx="15.73" cy="8.3" r="2"></circle><path d="M5 16c-2 1-2 5-2 5a7.81 7.81 0 0 0 5-2z"></path></svg>
                        </div>
                        <div className="px-4">
                            <h4>{props.data.Visitng_record.Position} </h4>
                        </div>
                    </div>
                    <div className="mx-4 flex justify-items-start mb-2">
                        <div className="px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(0, 0, 0, 1)"}}><path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"></path></svg>
                        </div>
                        <div className="px-4">
                            <h4>{props.data.Visitng_record.HRName} </h4>
                        </div>
                    </div>
                    <ul  className="mx-4 flex flex-col justify-items-start mb-2 list-disc">
                        <ErrorBoundary component_name={"ReadMoreReact"}>
                            <ReadMoreReact text= {props.data.Visitng_record.Description}
                                       min={70}
                                       ideal={80}
                                       max={90}
                                       readMoreText={".....read more"}/>
                        </ErrorBoundary>
                        {/*{props.data.Visitng_record.Description.split(".").map(ev=><>*/}
                        {/*    <li my-2>*/}
                        {/*        <p className="text-black-100 text-base mb-2">*/}
                        {/*            {ev}*/}
                        {/*        </p>*/}
                        {/*    </li>*/}
                        {/*</>)}*/}
                    </ul>
                    {props.data.Visitng_record.Pdf !== null &&<>
                        <a href={props.data.Visitng_record.Pdf}>
                            <div className="mx-8 p-3  flex justify-center mb-6 rounded-2xl rounded-3xl border-2 border-slate-400 cursor-pointer  text-indigo-700 border-2 border-gray-200 shadow-lg hover:bg-indigo-700  hover:text-white rounded-2xl  transition duration-300 cursor-pointer">
                                <div className="px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         className=" hover:fill-white-700"      style={{fill: "rgba(0, 0, 0, 1)"}}>
                                        <path
                                            d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z"></path>
                                        <path
                                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z"></path>
                                    </svg>
                                </div>
                                <div className="px-4 ">
                                    <h4>Description.pdf</h4>
                                </div>
                            </div>
                        </a>
                    </>}

                    {props.Dashboard?<>
                        <Link to={`/dashboard/post_detail/${props.data.id}`}>
                            <div className="mx-8 p-3  flex justify-center mb-6 rounded-2xl rounded-3xl border-2 border-slate-400 cursor-pointer  text-indigo-700 border-2 border-gray-200 shadow-lg hover:bg-indigo-700  hover:text-white rounded-2xl  transition duration-300 cursor-pointer">
                                <div className="px-4">
                                {/*  Todo :add svg*/}
                                </div>
                                <div className="px-4 ">
                                    <h4>Post Detail </h4>
                                </div>
                            </div>
                        </Link>
                    </>:<>
                        {Login_state.Login?<>
                            {props.data.expired?<>
                                <div
                                    className="py-2 px-10 f underline  cursor-pointer  text-red-700 opacity-50 cursor-not-allowed  transition duration-300 w-full text-center"
                                >Expired - sorry cannot submit the response</div>

                            </>:<>

                                {props.data.User_submitted ?<>
                                    <div
                                        className="py-2 px-10 f underline  cursor-pointer  text-indigo-700 opacity-50 cursor-not-allowed  transition duration-300 w-full text-center"
                                    >Submitted</div
                                    >
                                </>:<>
                                    {props.data.is_user_eligible["final"] ?<>
                                        <div className="mx-4 flex justify-between">
                                            <div
                                                className="py-2 select-none px-10 f rounded-3xl border-2 border-slate-400 cursor-pointer  text-red-700 border-2 border-gray-200 shadow-lg hover:bg-red-700  hover:text-white rounded-2xl  transition duration-300"
                                                onClick={Reject_callback}
                                            >Reject</div>
                                            <div onClick={Accept_callback}
                                                 className="py-2 select-none px-10 f rounded-3xl border-2 border-slate-400 cursor-pointer  text-indigo-700 border-2 border-gray-200 shadow-lg hover:bg-indigo-700  hover:text-white rounded-2xl  transition duration-300"
                                            >Apply</div
                                            >
                                        </div>

                                    </>:<>
                                        <div
                                            className="py-2 px-10 f underline  cursor-pointer  text-red-700 opacity-50 cursor-not-allowed  transition duration-300 w-full text-center"
                                        >Not eligible
                                            {
                                            props.data.is_user_eligible["reason"].map(ev=>{
                                                return <p>{ev}</p>
                                            })}
                                        </div
                                        >
                                    </>
                                    }


                                </>}

                            </>}

                        </>:<>
                            <div
                                className="py-2 px-10 f underline  cursor-pointer  text-red-700 opacity-50 cursor-not-allowed  transition duration-300 w-full text-center"
                            >Login in to respond</div
                            >
                        </>}




                    </>}

                    <RWebShare
                        data={{
                            text: `${props.data.Originator_email} post for ${props.data.Company_name} visitng on ${props.data.Visitng_record.visiting_date}`,
                            url: `${window.location.origin}/post/${props.data.id}`,
                            title: "Post share",
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                    <div className="flex justify-center m-4 ">
                        <button type="button"
                                className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center justify-center w-full">
                            <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 24 24" style={{"fill": "rgba(255, 252, 252, 1)"}}>
                                <path
                                    d="M3 12c0 1.654 1.346 3 3 3 .794 0 1.512-.315 2.049-.82l5.991 3.424c-.018.13-.04.26-.04.396 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.794 0-1.512.315-2.049.82L8.96 12.397c.018-.131.04-.261.04-.397s-.022-.266-.04-.397l5.991-3.423c.537.505 1.255.82 2.049.82 1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .136.022.266.04.397L8.049 9.82A2.982 2.982 0 0 0 6 9c-1.654 0-3 1.346-3 3z"></path>
                            </svg>
                            Share
                        </button>
                    </div>
                    </RWebShare>
                </div>
            </div>
        </div>
    </UpperHoc>
    </>

}