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
window.years=[2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
window.list_of_all_fields=['id', 'email', 'MIS_no', 'Bio', 'First_name', 'middle_name', 'Last_name', 'Date_Of_Birth', 'Country_name', 'State_name', 'Locality_name', 'PostalCode', 'Building_name_And_RoomNumber', 'Student_phone_number', 'Parent_phone_number', 'Roll_no', 'JEE', 'MhCET', 'SSC', 'HSC', 'Diploma', 'Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6', 'Sem7', 'Sem8', 'DeadKT', 'No_Of_DeadKT', 'LiveKT', 'No_Of_LiveKT', 'Gate_Status', 'future_options', 'linkedin_profile', 'Github_profile', 'Resume_profile', 'Internship', 'collage_passingYear', 'collage_joinig_year', 'i_card_image', 'email_verified', 'Affliated_Department','detail']
window.list_of_student=[]
window.Company=undefined


export default class App extends Component {
  constructor(props) {
    super(props);
    logdata("App","init",`App render Started`)
  }
  componentDidMount() {
        this.props.hideLoader();
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

