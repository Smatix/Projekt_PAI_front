import React, { Component } from "react";
import "./List.css"
import Reservation from "../../list_element/Reservation";

class List extends Component {



    render() {
        return (
            <div className="list-container">
                <div className="bar-container">
                    {this.props.title}
                </div>
                {this.props.list && this.props.list.length ? this.props.list : "Brak wyników"}
            </div>
        );
    }
}

export default List;