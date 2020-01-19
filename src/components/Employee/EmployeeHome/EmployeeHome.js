import React, { Component } from "react";
import AcceptOrDiscard from "../../../shared/list_element/AcceptOrDiscard";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import List from "../../../shared/elements/List/List";
import VehicleIcon from "../../../shared/elements/VehicleIcon";

class EmployeeHome extends Component {

    state = {
        reservations: [],
        stayingsToAccept: [],
        stayingsToFinish: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.loadReservations();
        this.loadStyingToAccept();
        this.loadStyingToFinish();
    };

    loadReservations = () => {
        axios.get(`${config.url}/api/employee/reservations`, {
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
    };

    loadStyingToAccept = () => {
        axios.get(`${config.url}/api/employee/stayings`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.setState({
                    stayingsToAccept: res.data,
                });
            })
            .catch(err => {
                toast.error('Problem z pobraniem danych');
            })
    };

    loadStyingToFinish = () => {
        axios.get(`${config.url}/api/employee/finish/stayings`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.setState({
                    stayingsToFinish: res.data,
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
                this.loadData()
            })
            .catch(err => {
                toast.error('Problem z rozpoczęciem parkowania');
            })
    };

    acceptStaying = id => {
        axios.patch(`${config.url}/api/employee/stayings/${id}/accept`, null,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Postój zaakceptowany');
                this.loadData()
            })
            .catch(err => {
                toast.error('Problem z rozpoczęciem parkowania');
            })
    };

    discardDeparture = id => {
        axios.patch(`${config.url}/api/employee/stayings/${id}/resume`, null,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Wyjazd został odrzucony');
                this.loadData()
            })
            .catch(err => {
                toast.error('Problem z rozpoczęciem parkowania');
            })
    };

    finishStaying = id => {
        axios.patch(`${config.url}/api/employee/stayings/${id}/finish`, null,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Wyjazd zaakceptowany');
                this.loadData()
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
                            <AcceptOrDiscard
                                key={item.id}
                                element={item}
                                accept={() => this.acceptReservation(item.id)}
                            >
                                <div>{`${item.name} ${item.surname}`}</div>
                                <div style={{fontSize: '0.5em'}}>{item.email}</div>
                                <VehicleIcon type={item.type}/>
                                <div style={{fontSize: '0.5em'}}>{`Data ${item.expiredDate}`}</div>
                            </AcceptOrDiscard>
                        )
                    })}
                />
                <List
                    title="Postoje do zaakceptowania"
                    list={this.state.stayingsToAccept.map(item => {
                        return (
                            <AcceptOrDiscard
                                key={item.id}
                                element={item}
                                accept={() => this.acceptStaying(item.id)}
                            >
                                <div>{`${item.name} ${item.surname}`}</div>
                                <div style={{fontSize: '0.5em'}}>{item.email}</div>
                                <VehicleIcon type={item.type}/>
                            </AcceptOrDiscard>
                        )
                    })}
                />
                <List
                    title="Wyjazdy do zaakceptowania"
                    list={this.state.stayingsToFinish.map(item => {
                        return (
                            <AcceptOrDiscard
                                key={item.id}
                                element={item}
                                accept={() => this.finishStaying(item.id)}
                                discard={()=> this.discardDeparture(item.id)}
                            >
                                <div>{`${item.name} ${item.surname}`}</div>
                                <div style={{fontSize: '0.5em'}}>{item.email}</div>
                                <div style={{fontSize: '0.5em'}}>{`Kwota do zapłaty: ${item.amount} zł`}</div>
                                <VehicleIcon type={item.type}/>
                            </AcceptOrDiscard>
                        )
                    })}
                />
            </div>
        );
    }

}

export default EmployeeHome;