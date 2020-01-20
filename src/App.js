import React, { Component } from "react";
// import Login from "./components/Login/Login";
import "./App.css"
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UserPage from "./components/User/UserPage";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ProtectedRoute} from "./auth/ProtectedRoute";
import {toast} from "react-toastify";
import {Guard} from "./auth/Guard";
import EmployeePage from "./components/Employee/EmployeePage";
import {NotAuthRoute} from "./auth/NotAuthRoute";

class App extends Component {
    constructor(props) {
        super(props);
        toast.configure({
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
        });
    }
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Guard path="/guard"/>
                        <ProtectedRoute
                            path="/employee"
                            component={EmployeePage}
                            role="ROLE_EMPLOYEE"
                        />
                        <ProtectedRoute
                            path="/user"
                            component={UserPage}
                            role="ROLE_USER"
                        />
                        <NotAuthRoute
                            path="/register"
                            component={Register}
                        />
                        <NotAuthRoute
                            path="/login"
                            component={Login}
                        />
                        <Guard
                            path="*"
                        />
                    </Switch>
                </Router>
            </div>

        );
    }
}

export default App;
