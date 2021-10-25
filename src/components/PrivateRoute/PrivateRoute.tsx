import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Layout } from '..'

interface PrivateLayoutProps extends RouteProps {
  layout?: React.FC
}

const PrivateRoute: React.FC<PrivateLayoutProps> = ({ layout: CustomLayout ,component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  let RederLayout = Layout;

  if (loading) {
    return <div>Cargando....</div>
  }

  if (!Component) {
    return null;
  }

  if (CustomLayout) {
    RederLayout = CustomLayout;
  }

  return(
    <Route
      {...rest}
      render={({ location, ...props }) => user ? (
        <RederLayout>
          <Component {...props} location={location} />
        </RederLayout>
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