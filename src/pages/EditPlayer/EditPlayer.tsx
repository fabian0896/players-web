import React, { useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PlayerForm, ErrorPage } from '../../components';
import { useAuth } from '../../context/auth';
import { useGetPlayer } from '../../hooks';
import { PlayerCreate } from '../../react-app-env';
import { PlayerService } from '../../services';

type EditPLayerPararams = {
  id: string,
}

const EditPlayer: React.FC = () => {
  const { id } = useParams<EditPLayerPararams>();
  const history = useHistory();
  const { token } = useAuth();
  const { data, loading, error } = useGetPlayer(id, token);

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
      history.push('/players');
    } catch (error) {
      throw new Error('Algo salio mal al actualizar el jugador 😢');
    }
  }, [id, token, history]);

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
