import React, { useMemo } from "react";
import { useLocation } from 'react-router-dom';

import { SignupForm } from '../../components';
import { SignupCredentials } from "../../react-app-env";
import { AuthService } from "../../services";

const Signup: React.FC = () => {
  const { search } = useLocation();

  const token = useMemo(() => {
    const query = new URLSearchParams(search);
    return query.get('token');
  }, [search]);

  const handleSubmit = async (values: Partial<SignupCredentials>) => {
    const credentials: SignupCredentials = {
      name: values.name || '',
      email: values.email || '',
      password: values.password || '',
      inviteToken: token || '',
    };
    await AuthService.signup(credentials);
  }

  return(
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
      <SignupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Signup;