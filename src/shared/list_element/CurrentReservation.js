import React, { Component } from "react";
import "./ListElement.css"
import PrimaryBtn from "../buttons/PrimaryBtns/PrimaryBtn";

class CurrentReservation extends Component {

    getStatus = status => {
        if (status === 1) return "W trakcie";
        if (status === 2) return "Aktywna";
    };

    render() {
        const {name, expiredDate: date, status} = this.props.element;
        return (
            <div className="list-element-container">
                <div>
                    <div>{name}</div>
                    <div style={{fontSize: '0.6em'}}>{`Data: ${date}`}</div>
                    <div style={{fontSize: '0.5em'}}>{`Status: ${this.getStatus(status)}`}</div>
                    <div className="buttons-container">
                        {status === 1 ? null :
                        <PrimaryBtn text="Zaparkuj" type="blue-btn" click={this.props.onFinish}/>}
                        <PrimaryBtn text="Anuluj" type="red-btn" click={this.props.onCancel}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrentReservation;