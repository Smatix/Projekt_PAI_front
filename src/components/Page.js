import React, { Component } from "react";
import {isMobile} from "react-device-detect";
import "./Page.css"
import axios from "axios";
import config from "../config";
import {toast} from "react-toastify";
import Menu from "./Menu/Menu";
import NavBar from "./NavBar/NavBar";

class Page extends Component {

    Menu = [
        {name: "Start", icon: "fas fa-home", to: "/employee/"},
        {name: "Aktualne rezerwacje", icon: "fas fa-calendar", to: "/employee/reservations"},
        {name: "Aktualne postoje", icon: "far fa-clock", to: "/employee/stayings"},
    ];

    constructor(props) {
        super(props);
        let showMenu = true;
        if (isMobile) {
            showMenu = false;
        }
        this.state = {
            showMenu: showMenu,
            userData: {
                name: "",
                surname: "",
                email: ""
            }
        };
    }

    componentDidMount() {
        axios.get(`${config.url}/api/user/data`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.setState({
                    userData: res.data,
                });
            })
            .catch(err => {
                toast.error('Problem z pobraniem danych');
            })
    }

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
        return (
            <div className="page-container">
                <NavBar
                    menu = {this.handleMenu}
                    logout = {this.logout}
                />
                {this.state.showMenu
                    ? <Menu
                        menuList={this.props.menu}
                        title={`${this.state.userData.name} ${this.state.userData.surname}`}
                        subtitle={this.state.userData.email}
                    />
                    : null}
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Page;