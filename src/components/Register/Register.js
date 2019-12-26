import React, { Component } from "react";
import "./Register.css"
import LoginFormHeader from "../../shared/elements/LoginFormHeder/LoginFormHeader";
import FormField from "../../shared/forms/FormField/FormField";
import ConfirmBtn from "../../shared/buttons/ConfirmBtn/ConfirmBtn";

class Register extends Component {

    render() {
        return (
            <div className="body-container">
                <div className="register-container">
                    <LoginFormHeader/>
                    <p className="register-title">Stwórz konto</p>
                    <div className="register-form-container">
                        <FormField
                            label="Imię"
                            type="text"
                            placeholder=""
                        />
                        <FormField
                            label="Nazwisko"
                            type="text"
                            placeholder=""
                        />
                        <FormField
                            label="Email"
                            type="text"
                            placeholder="xyz@gmail.com"
                        />
                        <FormField
                            label="Hasło"
                            type="password"
                        />
                        <FormField
                            label="Powtórz hasło"
                            type="password"
                        />
                        <FormField
                            label="Numer telefonu"
                            type="text"
                            placeholder="1234566789"
                        />
                        <FormField
                            label="Data urodzenia"
                            type="date"
                            placeholder="22/05/1997"
                        />
                        <ConfirmBtn text="Utwórz"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;