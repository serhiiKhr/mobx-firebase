import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute: React.FC<any> = (props: any) => {
  const Component = props.component;
  const { component, isLoggedIn, ...rest } = props;
  return (
    <Route
      {...rest}
      component={(props: any) =>
        !isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
};

export default PublicRoute;
