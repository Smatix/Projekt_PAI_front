import React, { Component } from "react";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import ParkingReservation from "../../../shared/list_element/ParkingReservation";
import List from "../../../shared/elements/List/List";


class EmployeeReservations extends Component {

    state = {
        reservations: []
    };

    componentDidMount() {
        axios.get(`${config.url}/api/employee/reservations/all`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.setState({
                    reservations: res.data,
                });
            })
            .catch(err => {
                toast.error('Problem z pobraniem danych');
            })
    }

    render() {
        return (
            <div className="reservations-container">
                <List
                    title="Aktualne rezerwacje"
                    list={
                        this.state.reservations.map(el => {
                            return <ParkingReservation
                                key={el.id}
                                element={el}
                            />
                        })
                    }
                />
            </div>
        );
    }
}

export default EmployeeReservations;