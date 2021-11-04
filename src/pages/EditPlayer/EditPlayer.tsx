import React, { useCallback } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { PlayerForm, ErrorPage } from '../../components';
import { useAuth } from '../../context/auth';
import { useGetPlayer } from '../../hooks';
import { PlayerCreate } from '../../react-app-env';
import { PlayerService } from '../../services';

import { Location } from 'history';

type EditPLayerPararams = {
  id: string,
}

const EditPlayer: React.FC = () => {
  const { id } = useParams<EditPLayerPararams>();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const { token } = useAuth();
  const { data, loading, error } = useGetPlayer(id);

  const handleGoPlayerList = () => {
    history.push('/players');
  }

  const handleSubmit = useCallback(async (values: PlayerCreate, picture: string | null) => {
    try {
      if (picture) {
        await PlayerService.updateWithImage(Number(id), values, picture, token);
      } else {
        await PlayerService.update(Number(id), values, token);
      }
      const { from } = location.state || { from: { pathname: '/players' } };
      history.replace(from);
    } catch (error) {
      throw new Error('Algo salio mal al actualizar el jugador 😢');
    }
  }, [id, token, history, location.state]);

  if (loading) {
    return null;
  }

  if (error || !data) {
    return (
      <ErrorPage 
        message="Algo salio mal, esto puede deberse a que se este busacndo un 
        jugador que no existe o haya un problema en el servidor. 
        Intenta nuevamente o comunicae con un administrador."
        title="Jugador no encontrado"
        buttonTitle="Ver lista de jugadores"
        onClick={handleGoPlayerList}
      />
    )
  }

  return(
    <div>
      <PlayerForm editData={data} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditPlayer;
