import React, { Component } from "react";
import "./UserPage.css"
import NavBar from "../NavBar/NavBar";
import Menu from "../Menu/Menu";
import Home from "./Home/Home";
import ParkingSearch from "./ParkingSearch/ParkingSearch";
import {Switch, Route} from "react-router-dom";
import Reservations from "./Reservations/Reservations";
import Stayings from "./Stayings/Stayings";
import Auth from "../../auth/Auth"
import axios from "axios";

class UserPage extends Component {

    userMenu = [
        {name: "Start", icon: "fas fa-home", to: "/user/"},
        {name: "Znajdź parking", icon: "fas fa-search", to: "/user/parkings"},
        {name: "Historia rezerwacji", icon: "fas fa-calendar", to: "/user/reservations"},
        {name: "Historia zaparkowań", icon: "far fa-clock", to: "/user/stayings"},
        {name: "Zmień dane", icon: "fas fa-user", to: "/user/change-data"},
    ];

    state = {
        showMenu: true
    };

    handleMenu = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }))
    };

    logout = () => {
        localStorage.removeItem("jwt");
        this.props.history.push("/login");
    };

    render() {
        console.log(Auth.getRoles().includes("ROLE_USER"));
        return (
            <div className="page-container">
                <NavBar
                    menu = {this.handleMenu}
                    logout = {this.logout}
                />
                {this.state.showMenu
                    ? <Menu
                        menuList={this.userMenu}
                        title="Mateusz Suchenia"
                        subtitle={"xyz@gmail.com"}
                    />
                    : null}
                <div className="content">
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
                </div>
            </div>
        );
    }
}

export default UserPage;