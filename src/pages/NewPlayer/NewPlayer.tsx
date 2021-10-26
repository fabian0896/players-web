import React from "react";
import { useHistory } from 'react-router-dom';
import { PlayerForm } from '../../components';
import { useAuth } from '../../context/auth';
import { PlayerCreate } from '../../react-app-env';
import { PlayerService } from '../../services';

const NewPlayer: React.FC = () => {
  const { token } = useAuth();
  const history = useHistory();

  const handleSubmit = async (values: PlayerCreate, picture: string | null) => {
    if (!token) {
      throw new Error('No tienes permisos para realizar esta acción');
    }
    const player = new PlayerService(values);
    try {
      if (picture) {
        await player.saveWithImage(picture, token);
      } else {
        await player.save(token);
      }
      history.push('/players')
    } catch (error) {
      console.log(error);
      throw new Error('Se presento un error al guardar el jugador');
    }
  }
  return(
    <div>
      <PlayerForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewPlayer;