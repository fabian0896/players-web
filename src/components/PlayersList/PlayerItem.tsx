import React, { useMemo } from "react";
import { FaRegEdit } from 'react-icons/fa';
import { differenceInYears } from 'date-fns';

import { PLayerResponse } from "../../react-app-env";
import { startCase } from "../../utils";

import basketballSvg from '../../assets/svg/basketball.svg';
import { Link } from "react-router-dom";

interface PLayerItemProps {
  player: PLayerResponse
}

const PLayerItem: React.FC<PLayerItemProps> = ({ player }) => {

  const age = useMemo(() => differenceInYears(new Date(), new Date(player.birthday)), [player.birthday]);

  return(
    <div className="w-full rounded-lg bg-white shadow-lg">
      <div className="p-4 pb-0 flex justify-between items-start">
        <span className={`text-xs p-1 ${player.active ? 'bg-green-400' : 'bg-red-500'} rounded text-white font-semibold`}>
          {player.active ? 'Activo' : 'Inactivo'}
        </span>
        <Link
          to={`/players/edit/${player.id}`}
          className="bg-gray-300 p-1.5 rounded-full transition transform hover:scale-105"
        >
          <FaRegEdit className="text-gray-700"/>
        </Link>

      </div>
      <div className="flex justify-center w-full p-5 pt-0">
        <div className="w-20 h-20 bg-gray-50 rounded-lg ring-2 ring-offset-2 ring-red-500 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={player.images?.small || basketballSvg} 
            alt={`${player.firstName} ${player.lastName}`} 
          />
        </div>
      </div>
      <div className="text-center p-5 pt-0">
        <Link to={`/players/${player.id}`} className="text-gray-800 font-semibold leading-5 block mb-1">{startCase(`${player.firstName} ${player.lastName}`)}</Link>
        <p className="text-gray-600 text-sm">{player.email}</p>
        <p className="text-gray-600 text-sm font-semibold">{age} años</p>
      </div>
      <div className="p-5 border-t-2 text-center">
        <p className="text-xs text-gray-600">Equipo</p>
        <h4 className="text-sm font-semibold text-red-500">Chicago Bulls</h4>
      </div>
    </div>
  );
};

export default PLayerItem;
