import React from "react";
import {
    Route,

} from "react-router-dom";
import Auth_dir from "./auth_dir";
import {useSelector} from "react-redux";
import Protected from "../CommonFunctions/Authentication/protected";
// import Dashboard_dir from "./dashboard_dir";
import {selectLogin} from "../features/UserAuth/AuthSlicer";
// import Timeline_master_component from "../components/timeline/Timeline_master";
import ErrorBoundary from "../CommonFunctions/Error_controlReact/ErrorBoundary";



export default function  Component_dir(props)
{
    const Login_state = useSelector(selectLogin);
        return (
            <>
                <Route path="/auth/">
                    <ErrorBoundary component_name={"Auth_dir"}>
                        <Auth_dir />
                    </ErrorBoundary>
                </Route>
                {/*<Route path="/dashboard/">*/}
                {/*    <Protected isLoggedIn={Login_state}>*/}
                {/*        <Dashboard_dir />*/}
                {/*    </Protected>*/}
                {/*</Route>*/}
                {/*<Route path="/timeline/">*/}

                {/*    <Protected isLoggedIn={Login_state}>*/}
                {/*        <Timeline_master_component />*/}
                {/*    </Protected>*/}
                {/*</Route>*/}
            </>
        );

}

