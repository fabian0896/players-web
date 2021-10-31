import React from 'react';
import { useHistory } from 'react-router-dom';

import { UsersList, UserInvite, ErrorPage } from '../../components';
import { useAuth } from '../../context/auth';
import { useUsers } from '../../hooks';
import { Invite, UpdateUserValues } from '../../react-app-env';
import { AuthService } from '../../services';

const Users: React.FC = () => {
  const history = useHistory();
  const { token } = useAuth();
  const { 
    data, 
    loading, 
    error,
    update 
  } = useUsers();

  const handleInvite = async (values: Invite) => {
    const data = await AuthService.invite(values, token);
    console.log(data);
  }

  const handleUpdate = async (id: number | string, values: UpdateUserValues) => {
    await update({ id, values });
  }

  if (loading) {
    return null;
  }

  if (error || !data) {
    return (
      <ErrorPage
        title="Algo salio mal!"
        message="Ocurrio un error al obtener los usuarios 
        puede deberse a que no tienes permisos para ver estos datos 
        o hay algun problema en el servidor. Comunicate con un administrador
        o intenta mas tarde."
        buttonTitle="Ir al incio"
        onClick={() => history.push('/home')}
      />
    )
  }

  return(
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-2 place-self-start w-full">
            <UserInvite onInvite={handleInvite} />
          </div>
          <div className="col-span-3">
            <UsersList
              onUpdate={handleUpdate} 
              users={data} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
