import React, { Component } from "react";
import "../Page.css"
import {Switch, Route} from "react-router-dom";
import Page from "../Page";


class EmployeePage extends Component {

    employeeMenu = [
        {name: "Start", icon: "fas fa-home", to: "/employee/"},
        {name: "Aktualne rezerwacje", icon: "fas fa-calendar", to: "/employee/reservations"},
        {name: "Aktualne postoje", icon: "far fa-clock", to: "/employee/stayings"},
        {name: "Przełącz na konto użytownika", icon: "fas fa-arrow-circle-right", to: "/user"},
    ];

    render() {
        return (
            <Page menu={this.employeeMenu}>
                <Switch>
                    <Route path="/employee/" exact>
                    </Route>
                    <Route path="/employee/parkings" exact>
                    </Route>
                    <Route path="/employee/reservations" exact>
                    </Route>
                    <Route path="/employee/stayings" exact>
                    </Route>
                </Switch>
            </Page>
        );
    }
}

export default EmployeePage;