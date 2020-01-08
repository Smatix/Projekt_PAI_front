import React, { Component } from "react";

class VehicleIcon extends Component {

    getVehicleIcon = type => {
        if (type === "car") return (<i className="fas fa-car"></i>);
        if (type === "motorbike") return (<i className="fas fa-motorcycle"></i>);
    };

    render() {
        return (
            <div style={{fontSize: '0.8em'}}>{this.getVehicleIcon(this.props.type)}</div>
        );
    }
}

export default VehicleIcon;