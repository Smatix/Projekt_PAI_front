import React, { Component } from "react";
import "./Login.css"
import FormField from "../../shared/forms/FormField/FormField";
import ConfirmBtn from "../../shared/buttons/ConfirmBtn/ConfirmBtn";
import LoginFormHeader from "../../shared/elements/LoginFormHeder/LoginFormHeader";
import {Link, withRouter} from "react-router-dom";
import axios from 'axios';
import config from "../../config";
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {

    state = {
        username: "",
        password: "",
        error: false
    };

    handleLogin = () =>  {
        axios.post(`${config.url}/api/login`, this.state)
            .then(res => {
                //console.log(res.data.token);
                localStorage.setItem('jwt', res.data.token);
                this.props.history.push("/guard");
            })
            .catch(err => {
                this.setState({
                    error: true
                });
            })
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            error: false
        })
    };

    render() {
        console.log(localStorage.getItem('jwt'));
        return (
            <div className="body-container">
                <div className="login-container">
                    <LoginFormHeader/>
                    <div className="login-form-container">
                        <FormField
                            label="Email"
                            type="text"
                            placeholder="xyz@gmail.com"
                            name="username"
                            value={this.state.username}
                            change={this.handleChange}
                            error={this.state.error ? "Niepoprawny login" : null}
                        />
                        <FormField
                            label="Hasło"
                            type="password"
                            name="password"
                            value={this.state.password}
                            change={this.handleChange}
                            error={this.state.error ? "Niepoprawne hasło" : null}
                        />
                        <ConfirmBtn
                            text="Zaloguj"
                            click={this.handleLogin}
                        />
                        <p>Zapomniałem hasła</p>

                    </div>
                    <div className="login-footer">
                        <Link to={"/register"}>Stwórz darmowe konto</Link>
                    </div>
                </div>
            </div>

        );
    }

}

export default withRouter(Login);