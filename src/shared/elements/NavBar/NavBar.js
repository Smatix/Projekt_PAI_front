import React, { Component } from "react";
import "./NavBar.css"

class NavBar extends Component {

    render() {
        return (
            <div className="nav-bar">
                <div className="menu-btn" onClick={this.props.menu}>
                    <i className="fas fa-bars"></i>
                </div>
                Zaparkuj Fure
                <div className="logout-btn" onClick={this.props.logout}>
                    <i className="fas fa-power-off"></i>
                </div>
            </div>
        );
    }
}

export default NavBar;