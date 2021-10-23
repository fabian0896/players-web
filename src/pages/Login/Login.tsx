import React, { useState } from "react";
import { LoginForm } from '../../components';
import axios from "axios";

const Login: React.FC = () => {
  const [error, setError] = useState(false);
  const handleSubmit = async (values: { email: string, password: string }) => {
    setError(true);
    try {
      const { data } = await axios.post('http://localhost:4000/api/v1/auth/login', values, {
        withCredentials: true,
      });
      console.log(data);
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