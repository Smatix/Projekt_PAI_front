import React from "react";
import {Route, Redirect} from "react-router-dom";
import Auth from "./Auth"

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (Auth.hasRole("ROLE_USER")) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }}
        />
    );
};