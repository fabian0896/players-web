import React, { useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { Button, ErrorPage, Input, Modal, PlayerInfoCard } from '../../components';
import { useGetPlayer } from '../../hooks';

type PlayerDetailsParams = {
  id: string,
};

const PlayerDetails: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [comfirmMessage, setComfirmMessage] = useState('');

  const { id } = useParams<PlayerDetailsParams>();
  const history = useHistory();
  const location = useLocation();
  const { 
    data, 
    loading, 
    error,
    updateActive,
    destory,
  } = useGetPlayer(id);

  const handleEdit = (playerId: number) => {
    history.push({
      pathname: `/players/edit/${playerId}`,
      state: { from: location },
    });
  };

  const handleUpdateActive = (active: boolean) => {
    updateActive({ active });
  };

  const handleDestroy = async () => {
    await destory();
    history.push('/players');
  }

  if (loading) {
    return null;
  }

  if (error || !data) {
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
      <Modal
        title="Eliminar jugador!"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <p className="text-center text-gray-700 my-5">
          escriba la palabra <strong className="font-bold text-gray-900">eliminar</strong> para poder borrar el jugador de la base de datos
        </p>
        <Input
          value={comfirmMessage}
          onChange={({ target }) => setComfirmMessage(target.value)}
          className="mb-5" 
        />
        <Button
          onClick={handleDestroy}
          disabled={comfirmMessage.toLocaleLowerCase() !== 'eliminar'} 
          full
        >
            Eliminar
        </Button>
      </Modal>
      <PlayerInfoCard
        onChangeActive={(_, active) => handleUpdateActive(active)}
        onEdit={handleEdit}
        onDelete={() => setModalOpen(true)}
        onSendCarnet={() => console.log('Enviando carnet a jugador...')}
        player={data} 
      />
    </div>
  );
};

export default PlayerDetails;
