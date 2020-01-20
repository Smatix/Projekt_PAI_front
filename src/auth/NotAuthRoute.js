import React from "react";
import {Route, Redirect} from "react-router-dom";
import Auth from "./Auth"

export const NotAuthRoute = ({component: Component,...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!Auth.isAuth()) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to={
                        {
                            pathname: "/guard",
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