import React, { Component } from "react";
import ReservationToAccept from "../../../shared/list_element/ReservationToAccept";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import List from "../../../shared/elements/List/List";

class EmployeeHome extends Component {

    state = {
        reservations: []
    };

    componentDidMount() {
        this.loadReservations()
    }

    loadReservations = () => {
        axios.get(`${config.url}/api/employee/reservations`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                console.log(res.data);
                this.setState({
                    reservations: res.data,
                });
            })
            .catch(err => {
                toast.error('Problem z pobraniem danych');
            })
    };

    acceptReservation = id => {
        axios.patch(`${config.url}/api/reservations/${id}/accept`, null,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Rezerwacja zaakceptowana');
                this.loadReservations();
            })
            .catch(err => {
                toast.error('Problem z rozpoczęciem parkowania');
            })
    };

    render() {
        return (
            <div className="home-container">
                <List
                    title="Rezerwacje do zaakceptowania"
                    list={this.state.reservations.map(item => {
                        return (
                            <ReservationToAccept
                                key={item.id}
                                element={item}
                                accept={() => this.acceptReservation(item.id)}
                            />
                        )
                    })}
                />
            </div>
        );
    }

}

export default EmployeeHome;