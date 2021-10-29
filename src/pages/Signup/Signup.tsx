import React, { useMemo } from "react";
import { useLocation } from 'react-router-dom';

import { SignupForm } from '../../components';

const Signup: React.FC = () => {
  const { search } = useLocation();

  const token = useMemo(() => {
    const query = new URLSearchParams(search);
    return query.get('token');
  }, [search]);

  return(
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
      <SignupForm onSubmit={async () => {}} error={false} />
    </div>
  );
};

export default Signup;