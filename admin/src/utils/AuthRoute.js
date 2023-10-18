import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import localStore from './localStore';

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStore.isUserAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
