import React from "react";
import { NavLink } from 'react-router-dom';
import { FaHome, FaBasketballBall, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from "../../context/auth";

const Layout: React.FC = ({ children }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  }

  return(
    <div className="flex">
      <div className=" flex flex-col w-72 h-screen bg-gradient-to-tr from-red-900 to-red-500 shadow-lg">
        <div className="p-5">
          <img
            src="https://1000marcas.net/wp-content/uploads/2019/12/NBA-Logo.png" 
            alt="nba-logo" 
          />
        </div>
        <div className="p-5">
          <ul className="space-y-4">
            <li className="text-yellow-50">
              <NavLink
                exact
                activeClassName="bg-yellow-50 rounded text-red-900"
                className="p-2 px-5 flex items-center space-x-4 text-xl font-light transition"
                to="/">
                  <FaHome className="text-2xl" />
                  <span>Inicio</span>
              </NavLink>
            </li>
            <li className="text-yellow-50">
              <NavLink
                activeClassName="bg-yellow-50 rounded text-red-900"
                className="p-2 px-5 flex items-center space-x-4 text-xl font-light transition"
                to="/players">
                  <FaBasketballBall className="text-2xl" />
                  <span>Jugadores</span>
              </NavLink>
            </li>
            <li className="text-yellow-50">
              <NavLink
                activeClassName="bg-yellow-50 rounded text-red-900"
                className="p-2 px-5 flex items-center space-x-4 text-xl text-yellow-50 font-light transition"
                to="/users">
                  <FaUsers className="text-2xl" />
                  <span>Usuarios</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1"></div>
        <div className="p-5 my-5 text-center">
          <button
            onClick={handleLogout} 
            className="bg-yellow-50 w-full py-3 px-4 rounded font-semibold flex items-center text-gray-800 transition hover:bg-yellow-200"
          >
            <FaSignOutAlt className="mr-3 text-xl" />
            Cerrar sesión 👋🏼
          </button>
        </div>
      </div>
      <div className="flex-1">
        <div className="h-16 w-full shadow flex items-center px-5 py-2 justify-between">
          <div>
            <h2 className="text-3xl text-gray-700">Inicio</h2>
          </div>
          <div className="h-full flex space-x-3 items-center">
            <div>
              <p className="font-semibold text-gray-700 text-right">{user?.name}</p>
              <p className="text-sm font-light text-gray-600">{user?.email}</p>
            </div>
            <img className="h-full rounded shadow" src={user?.avatar} alt={user?.name} />
          </div>
        </div>
        {/* CONTENT */}
        <div>
         {children}
        </div>
      </div>
    </div>
  )
};

export default Layout;