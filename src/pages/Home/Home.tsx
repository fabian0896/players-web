import React from "react";
import { Link } from "react-router-dom";

import buildingWebsites from '../../assets/svg/building_websites.svg';
import { useAuth } from "../../context/auth";
import { roleVerify } from "../../utils";

const Home: React.FC = () => {
  const { user } = useAuth();
  return(
    <div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-10">
        <div className="flex justify-center mb-10">
          <img className="w-1/2" src={buildingWebsites} alt="building website" />
        </div>
        <div className="">
          <h1 className="text-center text-2xl text-gray-800 font-bold">
            Esta página esta en construcción
          </h1>
          <p className="text-gray-700 text-center mb-5">
            Pudes usar las demas páginas con total normalidad
          </p>
          <ul className="text-center list-inside list-disc">
            <li>
              <Link className="text-red-500 font-semibold underline" to="/players">
                Jugadores
              </Link>
            </li>
            {roleVerify(user, ['admin']) && (
              <li>
                <Link className="text-red-500 font-semibold underline" to="/users">
                  Usuarios
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
