import React, { Component } from "react";
import "./ListElement.css"
import AcceptBtn from "../buttons/SquareBtns/AcceptBtn";
import DiscardBtn from "../buttons/SquareBtns/DiscardBtn";

class AcceptOrDiscard extends Component {

    render() {
        return (
            <div className="list-element-container">
                <div>
                    {this.props.children}

                </div>
                <div className="buttons-container">
                    <AcceptBtn click={this.props.accept}/>
                    {this.props.discard !== undefined ? <DiscardBtn click={this.props.discard}/> : null}
                </div>
            </div>
        );
    }
}

export default AcceptOrDiscard;