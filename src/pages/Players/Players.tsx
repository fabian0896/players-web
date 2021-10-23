import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Players: React.FC = () => {
  const { token } = useAuth();
  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/players', { headers: { 'authorization': `Bearer ${token}` } }).then(({ data }) => {
      console.log(data);
    })
  }, [token])
  return(
    <div>
      hello from Players
    </div>
  );
};

export default Players;