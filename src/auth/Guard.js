import React from "react";
import {Route, Redirect} from "react-router-dom";
import Auth from "./Auth";

export const Guard = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (Auth.hasRole('ROLE_EMPLOYEE')) {
                    return <Redirect to={
                        {
                            pathname: "/employee",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                } else if(Auth.hasRole('ROLE_USER')) {
                    return <Redirect to={
                        {
                            pathname: "/user",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
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