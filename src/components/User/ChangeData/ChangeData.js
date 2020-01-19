import React, { Component } from "react";
import "./ChangeData.css"
import ConfirmBtn from "../../../shared/buttons/ConfirmBtn/ConfirmBtn";
import FormField from "../../../shared/forms/FormField/FormField";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";

class ChangeData extends Component{

    state = {
        data: {
            newEmail: this.props.email,
            oldPassword: "",
            newPassword: {
                first: "",
                second: ""
            },
        },
        error: {
            oldPassword: "",
            newPassword: {
                first: "",
                second: ""
            },
        }
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState(prevState => {
            return {
                data: {...prevState.data, [name]: value},
                error: {...prevState.error, [name]: ""}
            }
        })
    };

    handleChangePassword = event => {
        const {name, value} = event.target;
        this.setState(prevState => {
            return {
                data: {
                    ...prevState.data,
                    newPassword: {
                        ...prevState.data.newPassword,
                        [name]: value
                    }
                },
                error: {
                    ...prevState.error,
                    newPassword: {
                        ...prevState.error.newPassword,
                        [name]: ""
                    }
                }
            }
        });
    };

    handleChangeData = event => {

        axios.patch(`${config.url}/api/user/change_data`, this.state.data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Zmieniono dane');
            })
            .catch(err => {
                if (err.response.status === 400) {
                    this.setState(prevState => {
                        return {
                            error: {
                                ...prevState.error,
                                ...err.response.data
                            }
                        }
                    });
                } else {
                    toast.error('Problem ze zmianą danych');
                }

            })
    };

    render() {
        return (
            <div className="change-data-container">
                <div className="change-data-form-container">
                    <h3>Zmień dane</h3>
                    <FormField
                        label="Stare hasło"
                        type="password"
                        name="oldPassword"
                        value={this.state.data.oldPassword}
                        change={this.handleChange}
                        error={this.state.error.oldPassword}
                    />
                    <FormField
                        label="Hasło"
                        type="password"
                        name={"first"}
                        value={this.state.data.newPassword.first}
                        change={this.handleChangePassword}
                        error={this.state.error.newPassword.first}
                    />
                    <FormField
                        label="Powtórz hasło"
                        type="password"
                        name={"second"}
                        value={this.state.data.newPassword.second}
                        change={this.handleChangePassword}
                        error={this.state.error.newPassword.second}
                    />
                    <ConfirmBtn
                        text="Zmień dane"
                        click={this.handleChangeData}
                    />
                </div>
            </div>
        );
    }
}

export default ChangeData;