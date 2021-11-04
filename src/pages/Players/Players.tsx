import React, { ChangeEventHandler, useEffect, useState } from "react";
import { FaUserPlus, FaSearch } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


import { Button, ErrorPage, PlayersList } from '../../components';
import { usePlayers } from '../../hooks';

import greekFreak from '../../assets/svg/greek_freak.svg';

const Players: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const history = useHistory();
  const location = useLocation();
  const { 
    pages, 
    error,
    loading,
    fetchNextPage,
    hasNextPage
  } = usePlayers(search);

  const handleChage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target
    history.replace({
      pathname: '/players',
      search: `?search=${value}`,
    });
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('search');
    setSearch(value || '');
  }, [location.search]);

  if (loading) {
    return null;
  }

  if (error || !pages) {
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
    <div id="players-container" className="w-full">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-0 inset-y-0 pl-3 flex items-center">
            <FaSearch className="text-gray-600" size={20} />
          </div>
          <input
            onChange={handleChage}
            value={search}
            placeholder="Buscar..." 
            type="search"
            className="bg-white p-3 block w-full mb-5 rounded shadow-lg pl-12 outline-none"
          />
        </div>
        {!Boolean(pages.length) && (
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
        <InfiniteScroll
          scrollableTarget="layout-container"
          dataLength={pages.length}
          next={() => fetchNextPage()}
          hasMore={Boolean(hasNextPage)}
          loader={<p>Cargando...</p>}
          endMessage={
            <p className="text-gray-800 font-semibold mt-5 text-center">
              No hay mas jugadores
            </p>
          }
        >
          <PlayersList players={pages} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Players;