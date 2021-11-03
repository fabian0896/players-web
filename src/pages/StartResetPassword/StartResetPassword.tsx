import React from "react";
import { useHistory } from "react-router";

import { StartResetPasswordForm } from '../../components';
import { AuthService } from "../../services";



const StartResetPassword: React.FC = () => {
  const history = useHistory();

  const handleReset = async (email: string) => {
    await AuthService.startReset(email);
  };

  const handleGoLogin = () => {
    history.push('/login');
  };

  return(
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
      <StartResetPasswordForm
        onSubmit={handleReset}
        onFinish={handleGoLogin}
      />
    </div>
  );
};

export default StartResetPassword;
