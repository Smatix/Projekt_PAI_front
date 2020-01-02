import React, { Component } from "react";
import config from "../../config";
import axios from "axios";
import { toast } from 'react-toastify';
import "./Register.css"
import LoginFormHeader from "../../shared/elements/LoginFormHeder/LoginFormHeader";
import FormField from "../../shared/forms/FormField/FormField";
import ConfirmBtn from "../../shared/buttons/ConfirmBtn/ConfirmBtn";
import SelectField from "../../shared/forms/SelectField/SelectField";
import {withRouter} from "react-router-dom";

class Register extends Component {

    state = {
        data: {
            name: "",
            surname: "",
            email: "",
            plainPassword: {
                first: "",
                second: ""
            },
            role: 1
        },
        error: {
            name: "",
            surname: "",
            email: "",
            plainPassword: {
                first: "",
                second: ""
            },
            role: ""
        }
    };

    isValid = () => {
      if (this.state.data.name.length === 0) {
          this.setState(prevState => {
              return {
                  error: {
                      ...prevState.error,
                      name: "Pole nie powinno być puste"
                  }
              }
          });
          return false;
      }
      if (this.state.data.surname.length === 0) {
          this.setState(prevState => {
              return {
                  error: {
                      ...prevState.error,
                      surname: "Pole nie powinno być puste"
                  }
              }
          });
          return false;
      }
      if (this.state.data.email.length === 0) {
          this.setState(prevState => {
              return {
                  error: {
                      ...prevState.error,
                      email: "Pole nie powinno być puste"
                  }
              }
          });
          return false;
      }
      if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.data.email))) {
          this.setState(prevState => {
              return {
                  error: {
                      ...prevState.error,
                      email: "Adres emial nie jest poprawny"
                  }
              }
          });
          return false;
      }
      if (this.state.data.plainPassword.first.length === 0) {
          this.setState(prevState => {
              return {
                  error: {
                      ...prevState.error,
                      plainPassword: {
                          ...prevState.error.plainPassword,
                          first: "Pole nie powinno być puste",
                      }
                  }
              }
          });
          return false;
      }
      if (this.state.data.plainPassword.second.length === 0) {
          this.setState(prevState => {
              return {
                  error: {
                      ...prevState.error,
                      plainPassword: {
                          ...prevState.error.plainPassword,
                          second: "Pole nie powinno być puste",
                      }
                  }
              }
          });
          return false;
      }
      if (this.state.data.plainPassword.second !== this.state.data.plainPassword.first) {
          this.setState(prevState => {
              return {
                  error: {
                      ...prevState.error,
                      plainPassword: {
                          ...prevState.error.plainPassword,
                          second: "Hasło nie jest takie samo",
                      }
                  }
              }
          });
          return false;
      }
      return true;
    };

    handleRegister = event => {

        if (this.isValid()) {
            axios.post(`${config.url}/register`, this.state.data)
                .then(res => {
                    toast.success('Utworzono konto', {
                        onClose: () => {this.props.history.push("/login");}
                    });
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        console.log(err.response.data)
                    }
                    toast.error('Problem z utworzeniem konta');
                })
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
                    plainPassword: {
                        ...prevState.data.plainPassword,
                        [name]: value
                    }
                },
                error: {
                    ...prevState.error,
                    plainPassword: {
                        ...prevState.error.plainPassword,
                        [name]: ""
                    }
                }
            }
        });
    };

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
                            name={"name"}
                            value={this.state.data.name}
                            change={this.handleChange}
                            error={this.state.error.name}
                        />
                        <FormField
                            label="Nazwisko"
                            type="text"
                            placeholder=""
                            name={"surname"}
                            value={this.state.data.surname}
                            change={this.handleChange}
                            error={this.state.error.surname}
                        />
                        <FormField
                            label="Email"
                            type="text"
                            placeholder=""
                            name={"email"}
                            value={this.state.data.email}
                            change={this.handleChange}
                            error={this.state.error.email}
                        />
                        <FormField
                            label="Hasło"
                            type="password"
                            name={"first"}
                            value={this.state.data.plainPassword.first}
                            change={this.handleChangePassword}
                            error={this.state.error.plainPassword.first}
                        />
                        <FormField
                            label="Powtórz hasło"
                            type="password"
                            name={"second"}
                            value={this.state.data.plainPassword.second}
                            change={this.handleChangePassword}
                            error={this.state.error.plainPassword.second}
                        />
                        {/*<FormField*/}
                            {/*label="Numer telefonu"*/}
                            {/*type="text"*/}
                            {/*placeholder=""*/}
                            {/*name={"phoneNumber"}*/}
                            {/*value={this.state.data.phoneNumber}*/}
                            {/*change={this.handleChange}*/}
                            {/*error={this.state.error.phoneNumber}*/}
                        {/*/>*/}
                        {/*<FormField*/}
                            {/*label="Data urodzenia"*/}
                            {/*type="date"*/}
                            {/*placeholder="22/05/1997"*/}
                            {/*name={"birth"}*/}
                            {/*value={this.state.data.birth}*/}
                            {/*change={this.handleChange}*/}
                            {/*error={this.state.error.birth}*/}
                        {/*/>*/}
                        <SelectField
                            label="Wybierz rodzaj konta"
                            name={"role"}
                            change={this.handleChange}
                            options={[
                                {name: "Użytkownik", "value": 1},
                                {name: "Właściciel", "value": 3}
                            ]}
                            error={this.state.error.role}
                        />
                        <ConfirmBtn
                            text="Utwórz"
                            click={this.handleRegister}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);