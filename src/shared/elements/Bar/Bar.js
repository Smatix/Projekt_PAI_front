import React, { Component } from "react";
import "./Bar.css"

class Bar extends Component {

    render() {
        return (
            <div className="bar-container">
                {this.props.content}
            </div>
        );
    }
}

export default Bar;