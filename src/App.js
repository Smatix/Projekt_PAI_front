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
                        <Route path="/login" exact>
                            <Login/>
                        </Route>
                        <Guard
                            path="/guard"
                        />
                        <ProtectedRoute
                            path="/user"
                            component={UserPage}
                            role="ROLE_USER"
                        />
                        <Route path="/register" exact>
                            <Register/>
                        </Route>
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
