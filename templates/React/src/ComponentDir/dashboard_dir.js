import React from "react";
import {
    Route,
    useRouteMatch
} from "react-router-dom";
import Dashboard_index from "../components/Dashboard/dashboard_index";
import ErrorBoundary from "../CommonFunctions/Error_controlReact/ErrorBoundary";
import dahbard_img from "./../assets/images/dashboard.png"
import {logdata} from "../CommonFunctions/Logger/Logevents";

import Company from "../components/Dashboard/Company/Company";
import Company_profile from "../components/Dashboard/Company/Company_profile";
import Visiting_profile from "../components/Dashboard/Company/visitng_profile";
import Student from "../components/Dashboard/Student/student";
import Post_list from "../components/Dashboard/Post/post_list";
import College from "../components/Dashboard/College/College";
import PostDetail from "../components/Dashboard/Post/Post_detail";
import Department from "../components/Dashboard/department";


export default function  Dashboard_dir(props)
{
    logdata("Dashboard_dir","init",`Dashboard_dir initated`)
    let match = useRouteMatch();
    return (
        <>
            <ErrorBoundary component_name={"Auth_dir"}>
                <Dashboard_index >
                    <Route path={`${match.url}`} exact>
                        <>
                            <div className="row-span-1 lg:col-span-3 col-span-5">
                                <div className="flex justify-center">
                                    <div
                                        className="px-5 max-w-fit border-b-4 lg:text-4xl text-2xl border-indigo-700 font-bold"
                                    >
                                        DashBoard
                                    </div>
                                </div>
                            </div>
                            <div className="row-span-3 lg:col-span-3 col-span-5 rounded-2xl -mt-32 flex mx-auto">
                            <img src={dahbard_img} alt=""
                                 className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"></img>
                        </div>
                        </>
                    </Route>
                    <Route path={`${match.url}/college/`}>
                        <ErrorBoundary component_name={"College"}>
                            <College />
                        </ErrorBoundary>
                    </Route>
                    <Route path={`${match.url}/department/`}>
                        <ErrorBoundary component_name={"Department"}>
                            <Department />
                        </ErrorBoundary>
                    </Route>
                        <Route path={`${match.url}/student_search/`}>
                            <ErrorBoundary component_name={"Student"}>
                                <Student />
                            </ErrorBoundary>
                        </Route>
                        <Route path={`${match.url}/company_search/`}>
                            <ErrorBoundary component_name={"Company"}>
                                <Company />
                            </ErrorBoundary>
                        </Route>
                        <Route path={`${match.url}/company_profile/:pkId/`} exact>
                            <ErrorBoundary component_name={"Company_profile"}>
                                <Company_profile />
                            </ErrorBoundary>
                        </Route>
                        <Route path={`${match.url}/company_profile/:pkId/visitng_record/:vr`} >
                            <ErrorBoundary component_name={"Visiting_profile"}>
                                <Visiting_profile />
                            </ErrorBoundary>
                        </Route>
                    <Route path={`${match.url}/post_list/`}>
                        <ErrorBoundary component_name={"Post_list"}>
                            <Post_list />
                        </ErrorBoundary>
                    </Route>
                    <Route path={`${match.url}/post_detail/:pkId/`}>
                        <ErrorBoundary component_name={"PostDetail"}>
                            <PostDetail />
                        </ErrorBoundary>
                    </Route>
                </Dashboard_index>
            </ErrorBoundary>
        </>
    );

}