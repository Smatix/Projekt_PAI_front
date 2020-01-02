import React, { Component } from "react";
import "./ListElement.css"
import InvoiceBtn from "../buttons/SquareBtns/InvoiceBtn";
import TrashBtn from "../buttons/SquareBtns/TrashBtn";

class Staying extends Component {

    render() {
        return (
            <div className="list-element-container">
                <div>
                    <div>{this.props.name}</div>
                    <div style={{fontSize: '0.5em'}}>{this.props.email}</div>
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