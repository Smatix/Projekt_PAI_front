import React, { Component } from "react";
import "./ListElement.css"

class ParkingReservation extends Component {

    getVehicleIcon = type => {
        if (type === "car") return (<i className="fas fa-car"></i>);
        if (type === "motorbike") return (<i className="fas fa-motorcycle"></i>);
    };

    render() {
        const {id, type, expiredDate, name, surname, email} = this.props.element;
        return (
            <div className="list-element-container">
                <div>
                    <div>{`${name} ${surname}`}</div>
                    <div style={{fontSize: '0.5em'}}>{email}</div>
                    <div style={{fontSize: '0.8em'}}>{this.getVehicleIcon(type)}</div>
                    <div style={{fontSize: '0.5em'}}>{`Data: ${expiredDate}`}</div>
                </div>
            </div>
        );
    }
}

export default ParkingReservation;