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

