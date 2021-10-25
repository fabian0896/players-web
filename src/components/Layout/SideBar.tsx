import React from "react";
import { NavLink } from 'react-router-dom';
import { FaHome, FaBasketballBall, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { User } from "../../react-app-env";

interface SideBarProps {
  onLogout: () => Promise<void>
  user: User | null
}

const SideBar: React.FC<SideBarProps> = ({ onLogout, user }) => {
  return(
    <div className="flex flex-col w-72 h-screen bg-gray-100 shadow-lg border-r border-gray-200">
    <div className="p-5">
      <img
        src="https://1000marcas.net/wp-content/uploads/2019/12/NBA-Logo.png" 
        alt="nba-logo" 
      />
    </div>
    <div className="p-5">
      <ul className="space-y-4">
        <li className="text-red-800">
          <NavLink
            exact
            activeClassName="bg-red-500 rounded text-gray-100"
            className="p-2 px-5 flex items-center font-semibold space-x-4 text-xl transition"
            to="/">
              <FaHome className="text-2xl" />
              <span>Inicio</span>
          </NavLink>
        </li>
        <li className="text-red-800">
          <NavLink
            activeClassName="bg-red-500 rounded text-gray-100"
            className="p-2 px-5 flex items-center font-semibold space-x-4 text-xl transition"
            to="/players">
              <FaBasketballBall className="text-2xl" />
              <span>Jugadores</span>
          </NavLink>
        </li>
        <li className="text-red-800">
          <NavLink
            activeClassName="bg-red-500 rounded text-gray-100"
            className="p-2 px-5 flex items-center font-semibold space-x-4 text-xl transition"
            to="/users">
              <FaUsers className="text-2xl" />
              <span>Usuarios</span>
          </NavLink>
        </li>
      </ul>
    </div>
    <div className="flex-1"></div>
    <div className="p-5 border-t border-gray-300">
      <div className="flex space-x-3 mb-5">
        <div>
          <img className="w-16 rounded shadow" src={user?.avatar} alt={user?.name} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{user?.name}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
          <p className="text-sm font-semibold text-gray-600">{user?.role}</p>
        </div>
      </div>
      <div>
        <button
          onClick={onLogout}
          className="flex space-x-3 border border-gray-600 items-center py-2 px-4 w-full rounded text-gray-700 font-semibold transition hover:bg-red-500 hover:text-gray-100 hover:border-red-500"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  </div>
  );
};

export default SideBar;
