import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../context/auth";

const PrivateRoute: React.FC<RouteProps> = ({ children, component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando....</div>
  }

  return(
    <Route
      {...rest}
      render={({ location }) => user? (
        children
      ) : (
        <Redirect 
          to={{
            pathname: '/login',
            state: { from: location } 
          }} 
        />
      )}
    />
  );
};

export default PrivateRoute;