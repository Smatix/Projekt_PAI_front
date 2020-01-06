import React, { Component } from "react";
import "./ListElement.css"
import InvoiceBtn from "../buttons/SquareBtns/InvoiceBtn";
import TrashBtn from "../buttons/SquareBtns/TrashBtn";

class Staying extends Component {

    getStatus = status => {
        if (status === 1) return "W trakcie";
        if (status === 2) return "Opłacona";
        if (status === 3) return "Odrzucona";
    };

    getVehicleIcon = type => {
        if (type === "car") return (<i className="fas fa-car"></i>);
        if (type === "motorbike") return (<i className="fas fa-motorcycle"></i>);
    };

    render() {
        const {id, status, amount, parkingName, street, number, city, type} = this.props.element;
        return (
            <div className="list-element-container">
                <div>
                    <div>{parkingName}</div>
                    <div style={{fontSize: '0.4em'}}>{`${street} ${number}, ${city}`}</div>
                    <div style={{fontSize: '0.8em'}}>{this.getVehicleIcon(type)}</div>
                    <div style={{fontSize: '0.5em'}}>{`Zapłacono: ${amount} zł`}</div>
                    <div style={{fontSize: '0.5em'}}>
                        {`Status ${this.getStatus(status)}`}
                    </div>
                </div>
                <div className="buttons-container">
                    <InvoiceBtn/>
                    <TrashBtn/>
                </div>
            </div>
        );
    }
}

export default Staying;