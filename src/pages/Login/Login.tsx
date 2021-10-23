import React, { useState } from "react";
import { LoginForm } from '../../components';
import { LoginCredentials } from "../../react-app-env";
import { useAuth} from '../../context/auth';
import { useHistory, useLocation } from "react-router-dom";
import { Location } from 'history';

type LocationState = {
  from: Location
}

const Login: React.FC = () => {
  const [error, setError] = useState(false);
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { login } = useAuth();

  const handleSubmit = async (values: LoginCredentials) => {
    setError(false);
    try {
      await login(values);
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      setError(true);
    }
  }

  return(
    <div className="h-screen w-full flex justify-center items-center bg-yellow-50">
      <LoginForm error={error} onSubmit={handleSubmit}/>
    </div>
  );
};

export default Login;