import React, { useMemo } from "react";
import { useLocation, useHistory } from 'react-router-dom';

import { ErrorPage, SignupForm } from '../../components';
import { SignupFormFields } from "../../components/SignupForm/SignupForm";
import { SignupCredentials } from "../../react-app-env";
import { AuthService } from "../../services";

const Signup: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();

  const token = useMemo(() => {
    const query = new URLSearchParams(search);
    return query.get('token');
  }, [search]);

  const handleSubmit = async (values: SignupFormFields) => {
    const credentials: SignupCredentials = {
      ...values,
      inviteToken: token || '',
    };
    await AuthService.signup(credentials);
    history.push('/login');
  }

  if (!token) {
    return(
      <ErrorPage
        title="Invitación invalida"
        message="Para poder registrarte es necesaria una invitación valida. 
        Comunicate con un administrador para mas información"
        buttonTitle="Ir a pagina de ingreso"
        onClick={() => history.push('/login')}
      />
    )
  }

  return(
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
      <SignupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Signup;