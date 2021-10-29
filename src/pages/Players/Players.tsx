import React from "react";
import { FaUserPlus } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import { Button, ErrorPage, PlayersList } from '../../components';
import { usePlayers } from '../../hooks';

import greekFreak from '../../assets/svg/greek_freak.svg';

const Players: React.FC = () => {
  const history = useHistory();
  const { data, error, loading } = usePlayers();

  if (loading) {
    return null;
  }

  if (error || !data) {
    return (
      <ErrorPage 
        title="Algo salio mal"
        message="Algo salio mal al obtener los jugadores. Puede ser por causa de
        alguna falla en el servidor o por que no tengas los accesos necesarios para ver este contenido
        . Por favor comunicate con un administrador para verificar tu caso."
        buttonTitle="Cargar nuevmente"
      />
    )
  }

  return(
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        {!Boolean(data.length) && (
          <div className="w-full p-10 rounded-lg bg-white flex flex-col items-center justify-center">
            <img className="w-1/3" src={greekFreak} alt='empty' />
            <h2 className="my-5 text-2xl font-semibold text-gray-600">No hay jugadores en el sistema</h2>
            <Button
              onClick={() => history.push('/players/new')}
              icon={FaUserPlus}
            >
              Agregar jugador
            </Button>
          </div>
        )}
        <PlayersList players={data} />
      </div>
    </div>
  );
};

export default Players;