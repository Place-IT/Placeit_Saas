import React from "react";
import {
    Route,
    useRouteMatch
} from "react-router-dom";
import College from "../components/Dashboard/College/College";
import Company from "../components/Dashboard/Company/Company";
import Dashboard_index from "../components/Dashboard/dashboard_index";
import Department from "../components/Dashboard/department";
import Company_profile from "../components/Dashboard/Company/Company_profile";
import Visiting_profile from "../components/Dashboard/Company/visitng_profile";
import Student from "../components/Dashboard/Student/student";
import Student_profile from "../components/Dashboard/Student/student_profile";
import Post_list from "../components/Dashboard/Post/post_list";
import PostDetail from "../components/Dashboard/Post/Post_detail";


export default function  Dashboard_dir(props)
{
    let match = useRouteMatch();
    return (
        <>
        <Dashboard_index >
                    <Route path={`${match.url}/college/`}>
                        <College />
                    </Route>
                    <Route path={`${match.url}/department/`}>
                        <Department />
                    </Route>
                    <Route path={`${match.url}/student_search/`}>
                        <Student />
                    </Route>
                    <Route path={`${match.url}/student_profile/:pkId`}>
                        <Student_profile />
                    </Route>
                    <Route path={`${match.url}/company_search/`}>
                        <Company />
                    </Route>
                    <Route path={`${match.url}/company_profile/:pkId/`} exact>
                        <Company_profile />
                    </Route>
                    <Route path={`${match.url}/company_profile/:pkId/visitng_record/:vr`} >
                        <Visiting_profile />
                    </Route>
                    <Route path={`${match.url}/post_list/`}>
                        <Post_list />
                    </Route>
                    <Route path={`${match.url}/post_detail/:pkId/`}>
                        <PostDetail />
                    </Route>
        </Dashboard_index>

        </>
    );

}