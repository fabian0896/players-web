import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorPage, PlayerInfoCard } from '../../components';
import { useAuth } from '../../context/auth';
import { useGetPlayer } from '../../hooks';

type PlayerDetailsParams = {
  id: string,
};

const PlayerDetails: React.FC = () => {
  const { id } = useParams<PlayerDetailsParams>();
  const { token } = useAuth();
  const { data: player, loading, error } = useGetPlayer(id, token);

  if (loading) {
    return null;
  }

  if (error || !player) {
    return(
      <ErrorPage 
        message="Algo salio mal, esto puede deberse a que se este busacndo un 
        jugador que no existe o haya un problema en el servidor. 
        Intenta nuevamente o comunicae con un administrador."
        title="Jugador no encontrado"
        buttonTitle="Ver lista de jugadores"
        onClick={() => {}}
      />
    )
  }

  return(
    <div className="max-w-3xl mx-auto">
      <PlayerInfoCard player={player} />
    </div>
  );
};

export default PlayerDetails;
