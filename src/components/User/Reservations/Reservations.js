import React, { Component } from "react";
import "./Reservations.css"
import List from "../../../shared/elements/List/List";
import Reservation from "../../../shared/list_element/Reservation";


class Reservations extends Component {

    tab = [1,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];

    render() {
        return (
            <div className="reservations-container">
                <List
                    title="Historia rezerwacji"
                    list={
                        this.tab.map((el, index) => {
                            return <Reservation
                                key={index}
                                name={"Mateusz Suchenia"}
                                email={"xyz@gmail.com"}
                                time={"12:34:56"}
                            />
                        })
                    }
                />
            </div>
        );
    }
}

export default Reservations;