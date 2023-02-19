import React from "react";
import {
    Route,

} from "react-router-dom";
import Auth_dir from "./auth_dir";
import {useSelector} from "react-redux";
import Protected from "../CommonFunctions/Authentication/protected";
import {selectLogin} from "../features/UserAuth/AuthSlicer";
import Timeline_master_component from "../components/timeline/Timeline_master";
import ErrorBoundary from "../CommonFunctions/Error_controlReact/ErrorBoundary";
import Dashboard_dir from "./dashboard_dir";



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
                <Route path="/dashboard/">
                    <ErrorBoundary component_name={"Timeline_master_component"}>
                        <Protected isLoggedIn={Login_state}>
                            <Dashboard_dir />
                        </Protected>
                    </ErrorBoundary>
                </Route>

                <Route path="/timeline/">
                    <ErrorBoundary component_name={"Timeline_master_component"}>
                        <Protected isLoggedIn={Login_state}>
                                <Timeline_master_component />
                        </Protected>
                    </ErrorBoundary>
                </Route>

            </>
        );

}

