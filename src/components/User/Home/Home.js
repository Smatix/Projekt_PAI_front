import React, { Component } from "react";
import "./Home.css"
import List from "../../../shared/elements/List/List";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import CurrentStaying from "../../../shared/list_element/CurrentStaying";
import CurrentReservation from "../../../shared/list_element/CurrentReservation";



class Home extends Component {

    state = {
        reservations: [],
        staying: []
    };

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.loadCurrentReservation();
        this.loadCurrentStaying();
    }

    loadCurrentReservation() {
        axios.get(`${config.url}/api/user/reservations`, {
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

    loadCurrentStaying() {
        axios.get(`${config.url}/api/user/stayings`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                console.log(res.data);
                this.setState({
                    staying: res.data,
                });
            })
            .catch(err => {
                toast.error('Problem z pobraniem danych');
            })
    }

    finishReservation = id => {
        axios.patch(`${config.url}/api/reservations/${id}/finish`, null,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Rozpoczęto postój');
                this.loadData();
            })
            .catch(err => {
                toast.error('Problem z rozpoczęciem parkowania');
            })
    };

    cancelReservation = id => {
        axios.patch(`${config.url}/api/reservations/${id}/cancel`, null,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Anulowano rezerwację');
                this.loadData();
            })
            .catch(err => {
                toast.error('Problem z anulowaniem rezerwacji');
            })
    };

    finishStaying = id => {
        axios.patch(`${config.url}/api/stayings/${id}/finish`, null,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Zakończono postój');
                this.loadData();
            })
            .catch(err => {
                toast.error('Problem z zakończeniem postoju');
            })
    };

    render() {
        return (
            <div className="home-container">
                <List
                    title="Aktualne postoje"
                    list={this.state.staying.map(item => {
                        return (
                            <CurrentStaying
                                key={item.id}
                                element={item}
                                end={() => this.finishStaying(item.id)}
                            />
                        )
                    })}
                />
               <List
                   title="Aktualne rezerwacje"
                   list={
                       this.state.reservations.map(el => {
                           return <CurrentReservation
                               key={el.id}
                               element={el}
                               onFinish={() => this.finishReservation(el.id)}
                               onCancel={() => this.cancelReservation(el.id)}
                           />
                       })
                   }
               />
            </div>
        );
    }
}

export default Home;