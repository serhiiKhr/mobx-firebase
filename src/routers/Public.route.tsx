import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Types
import { IProtectedRoute } from '../types/Router';

const PublicRoute: React.FC<IProtectedRoute> = (props: IProtectedRoute) => {
    const Component: React.FC<any> = props.component;
    const { component, uid, ...rest } = props;
    return (
        <Route
            {...rest}
            component={(props: any) =>
                !uid ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    )
};

export default PublicRoute;
