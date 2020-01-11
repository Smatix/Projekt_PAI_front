import React, { Component } from "react";
import "./ListElement.css"
import PrimaryBtn from "../buttons/PrimaryBtns/PrimaryBtn";
import Timer from "../elements/Tmer/Timer";

class StayingToAccept extends Component {

    render() {
        return (
            <div className="list-element-container">
                <div>
                    <div>{this.props.title}</div>
                    <div style={{fontSize: '0.5em'}}>
                        {this.props.status === 1 ? "Postój czeka na akceptacje"
                            : "Wyjazd czeka na akceptacje"}
                    </div>
                </div>
            </div>
        );
    }
}

export default StayingToAccept;