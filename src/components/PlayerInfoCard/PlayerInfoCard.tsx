import React, { useMemo } from 'react';
import { PlayerData } from '../../react-app-env';
import { differenceInYears, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FaRegTrashAlt, FaRegNewspaper, FaRegEdit } from 'react-icons/fa';

import { startCase } from '../../utils';
import { ButtonCore, Button, Switch } from '..';

import './PlayerInfoCard.css';

import basketballSvg from '../../assets/svg/basketball.svg';

interface PlayerInfoCardProps {
  player: PlayerData,
  onDelete: (id: number) => void
  onEdit: (id: number) => void
  onSendCarnet: (id: number) => void
  onChangeActive: (id: number, active: boolean) => void
};

const PlayerInfoCard: React.FC<PlayerInfoCardProps> = ({ player, onDelete, onEdit, onSendCarnet, onChangeActive }) => {
  const age = useMemo(() => differenceInYears(new Date(), new Date(player.birthday)), [player.birthday]);
  return(
    <div className="w-full rounded-lg bg-white shadow-lg">
      <div className="flex space-x-10 p-10">
        <div className="w-52 h-52 rounded bg-gray-50 ring-4 ring-offset-4 ring-red-500">
          <img
            className="w-full h-full object-cover"
            src={player.images?.large || basketballSvg} 
            alt={`${player.firstName} ${player.lastName}`} 
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{startCase(`${player.firstName} ${player.lastName}`)}</h1>
            <h3 className="text-lg text-gray-600 font-light">Chicago Bulls</h3>
            <h2 className="text-gray-600 font-semibold">C.C {player.cedula}</h2>
          </div>
          <div>
            <p className="text-sm text-gray-600">Creado por:</p>
            <p className="text-sm font-semibold text-gray-800">{startCase(player.creator?.name)}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-center mb-2">
            <Switch value={player.active} onChange={(value) => onChangeActive(player.id ,value)} />
          </div>
          <p className="text-xs text-center font-semibold leading-3">{player.active ? 'activo' : 'inactivo'}</p>
        </div>
      </div>
      <div className="border-t-2 border-b-2 p-10">
        <h3 className="text-center text-2xl text-gray-800 mb-5">Información</h3>
        <div className="grid grid-cols-2 gap-5 PlayerInfoCard-info">
          <div className="bg-gray-100 py-2 px-4 rounded">
            <p className="text-sm text-gray-600">Correo electronico</p>
            <p className="font-semibold">{player.email}</p>
          </div>
          <div className="bg-gray-100 py-2 px-4 rounded">
            <p className="text-sm text-gray-600">Telefono</p>
            <p className="font-semibold">{player.phone}</p>
          </div>
          <div className="bg-gray-100 py-2 px-4 rounded">
            <p className="text-sm text-gray-600">Fehca de nacimiento</p>
            <p className="font-semibold">
              {format(new Date(player.birthday), "dd 'de' MMMM 'de' yyy", { locale: es })}
              {` (${age} años)`}
            </p>
          </div>
          <div className="bg-gray-100 py-2 px-4 rounded">
            <p className="text-sm text-gray-600">EPS</p>
            <p className="font-semibold">{player.eps}</p>
          </div>
          <div className="bg-gray-100 py-2 px-4 rounded">
            <p className="text-sm text-gray-600">cedula</p>
            <p className="font-semibold">{player.cedula}</p>
          </div>
          <div className="bg-gray-100 py-2 px-4 rounded">
            <p className="text-sm text-gray-600">Equipo</p>
            <p className="font-semibold">Chicago Bulls</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-5 justify-end p-10">
        <Button
          onClick={() => onDelete(player.id)} 
          icon={FaRegTrashAlt}
        >
            Eliminar
        </Button>
        <ButtonCore
          onClick={() => onSendCarnet(player.id)}
          icon={FaRegNewspaper}
          className="bg-green-500 text-white hover:bg-green-700 focus:ring-green-500">
            Enviar carnet
        </ButtonCore>
        <ButtonCore
          onClick={() => onEdit(player.id)}
          icon={FaRegEdit} 
          className="bg-gray-700 hover:bg-gray-900 text-white">
            Editar
        </ButtonCore>
      </div>
    </div>
  );
};

export default PlayerInfoCard;
