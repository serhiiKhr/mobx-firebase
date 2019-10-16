import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: React.FC<any> = (props: any) => {
  const Component = props.component;
  const { component, uid, ...rest } = props;
  return (
    <Route
      {...rest}
      component={(props: any) =>
        !!uid ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  )
};

export default PrivateRoute;


