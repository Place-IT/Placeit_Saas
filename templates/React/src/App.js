import React, { Component } from "react";
import BaseCss from "./common_css/index.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {logdata} from "./CommonFunctions/Logger/Logevents";
import NavBar from "./components/Basetemplate/NavBar/NavBar";
import ErrorBoundary from "./CommonFunctions/Error_controlReact/ErrorBoundary";
import Component_dir from "./ComponentDir/Component_dir";
window.department_list=["Department Of Information Technology","Department Of Chemical Engineering",
    "Department Of Computer Science","Department Of Electronics and Telecomnications",
    "Department Of Instrumental","Department Of Mechinical engineering"]
window.years=[2020,2023,2024,2025,2026,2027,2028,2029,2030]

export default class App extends Component {
  constructor(props) {
    super(props);
    logdata("App","init",`App render Started`)
  }
  render() {
    return (
        <>
             <Router>
                <ErrorBoundary component_name={"navbar"}>
                     <NavBar />
                </ErrorBoundary>
                <Switch>
                    <Route path="/">
                        <ErrorBoundary component_name={"Component_dir"}>
                            <Component_dir />
                        </ErrorBoundary>
                     </Route>
                </Switch>
            </Router>
        </>

    );
  }
}

