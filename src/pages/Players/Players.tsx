import React from "react";
import { ErrorPage, PlayersList } from '../../components';
import { usePlayers } from '../../hooks';

const Players: React.FC = () => {
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
        <PlayersList players={data} />
      </div>
    </div>
  );
};

export default Players;