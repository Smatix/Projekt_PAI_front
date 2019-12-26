import React, { Component } from "react";
import "./Login.css"
import FormField from "../../shared/forms/FormField/FormField";
import ConfirmBtn from "../../shared/buttons/ConfirmBtn/ConfirmBtn";
import LoginFormHeader from "../../shared/elements/LoginFormHeder/LoginFormHeader";

class Login extends Component {

    state = {
        username: "admin",
        password: "admin"
    };

    handleLogin = () =>  {
        let body = this.state;
        fetch('http://localhost/zaparkujfure/pai_backend/public/index.php/api/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
        });
    };

    render() {
        return (
            <div className="body-container">
                <div className="login-container">
                    <LoginFormHeader/>
                    <div className="login-form-container">
                        <FormField
                            label="Email"
                            type="text"
                            placeholder="xyz@gmail.com"
                        />
                        <FormField
                            label="Hasło"
                            type="password"
                        />
                        <ConfirmBtn
                            text="Zaloguj"
                            click={this.handleLogin}
                        />
                        <p>Zapomniałem hasła</p>
                    </div>
                    <div className="login-footer">
                        Stwórz darmowe konto
                    </div>
                </div>
            </div>

        );
    }

}

export default Login;