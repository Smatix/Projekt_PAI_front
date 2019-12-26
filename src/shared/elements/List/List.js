import React, { Component } from "react";
import "./List.css"
import Bar from "../Bar/Bar";
import Reservation from "../../list_element/Reservation";

class List extends Component {

    tab = [1,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];

    render() {
        return (
            <div className="list-container">
                <Bar
                    content="Historia rezerwacji"
                />
                {
                    this.tab.map(el => {
                        return <Reservation/>
                    })
                }

            </div>
        );
    }
}

export default List;