import React from "react";
import {
    Route, useRouteMatch,

} from "react-router-dom";
import Login from "../components/auth/Login/Login";
import SignUp from "../components/auth/SignUp/SignUp";

import {useSelector} from "react-redux";
import {
    selectLogin
} from "../features/UserAuth/AuthSlicer";
import Profile from "../components/auth/profile/Profile"
import PasswordResentInit from "../components/auth/EmailPasswordReset/EmailpasswordResetinit"
import EmailPasswordResent from "../components/auth/EmailPasswordReset/EmailPasswordReset"
import Settings from "../components/auth/Settings/Settings";
import Protected from "../CommonFunctions/Authentication/protected";
import Email_verification from "../components/auth/email_verification/email_verification";
import Email_verification_conform from "../components/auth/email_verification/verification_conform";
import Password_update from "../components/auth/passwordReset/PasswordReset";
import Profile_update from "../components/auth/Profile_Update/profile_update";
import Profile_image_update from "../components/auth/Profile_Update/profileImage_update";
import ErrorBoundary from "../CommonFunctions/Error_controlReact/ErrorBoundary";


export default function  Auth_dir(props)
{
    const Login_state = useSelector(selectLogin);
    let match = useRouteMatch();
    return (
        <>
                <Route path={`${match.url}/login/`}>
                    <ErrorBoundary component_name={"Login"}>
                        <Login />
                    </ErrorBoundary>
                </Route>

                <Route path={`${match.url}/signup/`}>
                    <ErrorBoundary component_name={"SignUp"}>
                        <SignUp />
                    </ErrorBoundary>
                </Route>

                <Route path={`${match.url}/profile/`}>
                    <ErrorBoundary component_name={"Profile"}>
                        <Protected isLoggedIn={Login_state}>
                            <Profile />
                        </Protected>
                    </ErrorBoundary>
                </Route>

                <Route path={`${match.url}/emailverifysent/`}>
                    <ErrorBoundary component_name={"Email_verification"}>
                        <Protected isLoggedIn={Login_state}>
                            <Email_verification/>
                        </Protected>
                    </ErrorBoundary>
                </Route>

                <Route path={`${match.url}/emailverifyconform/`}>
                    <ErrorBoundary component_name={"Email_verification_conform"}>
                        <Email_verification_conform />
                    </ErrorBoundary>
                </Route>

                <Route path={`${match.url}/forgotPassword/`}>
                    <ErrorBoundary component_name={"PasswordResentInit"}>
                        <PasswordResentInit />
                    </ErrorBoundary>
                </Route>

                <Route path={`${match.url}/forgotPasswordReset//`}>
                    <ErrorBoundary component_name={"EmailPasswordResent"}>
                        <EmailPasswordResent />
                    </ErrorBoundary>
                </Route>

                <Route exact path={`${match.url}/settings/`}>
                    <Protected isLoggedIn={Login_state}>
                        <ErrorBoundary component_name={"Settings"}>
                            <Settings />
                        </ErrorBoundary>
                    </Protected>
                </Route>

                <Route path={`${match.url}/settings/password_reset/`}>
                    <Protected isLoggedIn={Login_state}>
                        <ErrorBoundary component_name={"Password_update"}>
                            <Password_update />
                        </ErrorBoundary>
                    </Protected>
                </Route>

                <Route path={`${match.url}/settings/profileUpdate/`}>
                    <Protected isLoggedIn={Login_state}>
                        <ErrorBoundary component_name={"Profile_update"}>
                            <Profile_update />
                        </ErrorBoundary>
                    </Protected>
                </Route>

                <Route path={`${match.url}/settings/profileImage_update/`}>
                    <Protected isLoggedIn={Login_state}>
                        <ErrorBoundary component_name={"Profile_image_update"}>
                            <Profile_image_update />
                        </ErrorBoundary>
                    </Protected>
                </Route>
        </>
    );

}