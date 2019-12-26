import React, { Component } from "react";
import "./Menu.css"

class Menu extends Component {

    userMenu = [
        {name: "Start", icon: "fas fa-home"},
        {name: "Znajdź parking", icon: "fas fa-search"},
        {name: "Historia rezerwacji", icon: "fas fa-calendar"},
        {name: "Historia zaparkowań", icon: "far fa-clock"},
        {name: "Zmień dane", icon: "fas fa-user"},
    ];

    render() {
        return (
            <div className="menu-content">
                <div className="data-container">
                    <div className="data-text">Mateusz Suchenia</div>
                    <div className="small-text">xyz@gmail.com</div>
                </div>
                {this.userMenu.map(el => {
                    return (
                        <div className="menu-element">
                            <i className={el.icon}></i>
                            {el.name}
                        </div>
                    )
                })}
            </div>

        );
    }
}

export default Menu;