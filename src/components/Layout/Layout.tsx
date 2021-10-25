import React from "react";
import { useAuth } from "../../context/auth";
import { useHistory } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import SideBar from "./SideBar";
import { Button } from "..";

const Layout: React.FC = ({ children }) => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
  }

  const handleCreatePlayer = () => {
    history.push('/players/new');
  }

  return(
    <div className="flex">
      <SideBar user={user} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col h-screen">
        <div className="h-16 w-full shadow flex items-center px-5 py-2 justify-between">
          <div>
            <h2 className="text-3xl text-gray-700">Inicio</h2>
          </div>
          <div>
            <Button onClick={handleCreatePlayer} icon={FaUserPlus}>Crear jugador</Button>
          </div>
        </div>
        {/* CONTENT */}
        <div className="p-5 flex-1 overflow-y-auto">
         {children}
        </div>
      </div>
    </div>
  )
};

export default Layout;