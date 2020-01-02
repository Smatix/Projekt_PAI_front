import React, { Component } from "react";
import "./Stayings.css"
import List from "../../../shared/elements/List/List";
import Reservation from "../../../shared/list_element/Reservation";
import Staying from "../../../shared/list_element/Staying";


class Stayings extends Component {

    tab = [1,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];

    render() {
        return (
            <div className="reservations-container">
                <List
                    title="Historia pobytów"
                    list={
                        this.tab.map((el, index) => {
                            return <Staying
                                key={index}
                                name={"Mateusz Suchenia"}
                                email={"xyz@gmail.com"}
                            />
                        })
                    }
                />
            </div>
        );
    }
}

export default Stayings;