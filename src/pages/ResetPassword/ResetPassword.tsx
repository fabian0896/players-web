import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { ResetPasswordForm } from '../../components';
import { AuthService } from '../../services';

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const token = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('token');
  }, [location.search]);


  const handleReset = async (password: string) => {
    await AuthService.reset(token, password);
  }

  const handleGoLogin = () => {
    history.push('/login');
  }

  return(
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
      <ResetPasswordForm
        onFinish={handleGoLogin}
        onSubmit={handleReset}
      />
    </div>
  );
};

export default  ResetPassword;
