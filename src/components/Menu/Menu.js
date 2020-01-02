import React, { Component } from "react";
import "./Menu.css"
import {Link} from "react-router-dom";

class Menu extends Component {

    render() {
        return (
            <div className="side-bar">
                <div className="data-container">
                    <div className="data-text">{this.props.title}</div>
                    <div className="small-text">{this.props.subtitle}</div>
                </div>
                {this.props.menuList.map((el, index) => {
                    return (
                        <div className="menu-element" key={index}>
                            <Link to={el.to}>
                                <i className={el.icon}></i>
                                {el.name}
                            </Link>
                        </div>
                    )
                })}
            </div>

        );
    }
}

export default Menu;