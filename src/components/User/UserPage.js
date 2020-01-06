import React, { Component } from "react";
import Home from "./Home/Home";
import ParkingSearch from "./ParkingSearch/ParkingSearch";
import {Switch, Route} from "react-router-dom";
import Reservations from "./Reservations/Reservations";
import Stayings from "./Stayings/Stayings";
import Page from "../Page";
import Auth from "../../auth/Auth"

class UserPage extends Component {

    userMenu = [
        {name: "Start", icon: "fas fa-home", to: "/user/"},
        {name: "Znajdź parking", icon: "fas fa-search", to: "/user/parkings"},
        {name: "Historia rezerwacji", icon: "fas fa-calendar", to: "/user/reservations"},
        {name: "Historia zaparkowań", icon: "far fa-clock", to: "/user/stayings"},
        {name: "Zmień dane", icon: "fas fa-user", to: "/user/change-data"},
    ];

    constructor(props) {
        super(props)
        if (Auth.hasRole("ROLE_EMPLOYEE")) {
            this.userMenu.push(
                {name: "Przełącz na konto pracownika", icon: "fas fa-arrow-circle-right", to: "/employee"}
            )
        }
    }

    render() {
        return (
            <Page menu={this.userMenu}>
                <Switch>
                    <Route path="/user/" exact>
                        <Home/>
                    </Route>
                    <Route path="/user/parkings" exact>
                        <ParkingSearch/>
                    </Route>
                    <Route path="/user/reservations" exact>
                        <Reservations/>
                    </Route>
                    <Route path="/user/stayings" exact>
                        <Stayings/>
                    </Route>
                </Switch>
            </Page>
        );
    }
}

export default UserPage;