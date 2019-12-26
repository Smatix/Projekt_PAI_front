import React, { Component } from "react";
import "./Page.css"
import NavBar from "../../shared/elements/NavBar/NavBar";
import Menu from "../../shared/elements/Menu/Menu";
import Home from "../Home/Home";

class Page extends Component {

    state = {
        showMenu: true
    };

    handleMenu = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }))
    };

    render() {
        return (
            <div className="page-container">
                <NavBar
                    menu = {this.handleMenu}
                    logout = {() => {alert("Log out")}}
                />
                {this.state.showMenu ? <div className="side-bar"><Menu/></div> : null}
                <div className="content">
                    <Home/>
                </div>
            </div>
        );
    }
}

export default Page;