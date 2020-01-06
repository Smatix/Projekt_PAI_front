import React, { Component } from "react";
import "./ListElement.css"
import TrashBtn from "../buttons/SquareBtns/TrashBtn";


class Reservation extends Component {

    getVehicleIcon = type => {
        if (type === "car") return (<i className="fas fa-car"></i>);
        if (type === "motorbike") return (<i className="fas fa-motorcycle"></i>);
    };

    render() {
        const {id,expiredDate, parkingName, street, number, city, type} = this.props.element;
        return (
            <div className="list-element-container">
                <div>
                    <div>{parkingName}</div>
                    <div style={{fontSize: '0.4em'}}>{`${street} ${number}, ${city}`}</div>
                    <div style={{fontSize: '0.8em'}}>{this.getVehicleIcon(type)}</div>
                    <div style={{fontSize: '0.5em'}}>{`Data: ${expiredDate}`}</div>
                </div>
                <div className="buttons-container">
                    <TrashBtn/>
                </div>
            </div>
        );
    }
}

export default Reservation;