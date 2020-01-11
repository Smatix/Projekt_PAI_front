import React, { Component } from "react";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import CurrentStaying from "../../../shared/list_element/CurrentStaying";
import List from "../../../shared/elements/List/List";


class EmployeeStayings extends Component {

    state = {
        stayings: []
    };

    componentDidMount() {
        axios.get(`${config.url}/api/employee/active/stayings`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.setState({
                    stayings: res.data,
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
                    title="Aktualne postoje"
                    list={
                        this.state.stayings.map(el => {
                            return <CurrentStaying
                                key={el.id}
                                element={el}
                                title={`${el.name} ${el.surname}`}
                            />
                        })
                    }
                />
            </div>
        );
    }
}

export default EmployeeStayings;