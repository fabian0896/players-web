import React from 'react';
import { UpdateUserValues, User } from '../../react-app-env';

import UserItem from './UserItem';

import emptySvg from '../../assets/svg/greek_freak.svg';

interface UsersListProps {
  users: User[],
  onUpdate: (id: number | string, values: UpdateUserValues) => Promise<void>,
}

const UsersList: React.FC<UsersListProps> = ({ users, onUpdate }) => {
  return(
    <div className="bg-white shadow-lg rounded-lg">
      {Boolean(users.length) ? (
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b-2 text-gray-800 font-semibold">
              <th className="text-left p-3">Nombre</th>
              <th>Role</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserItem onUpdate={onUpdate} key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="px-20 py-10 flex flex-col justify-center items-center">
          <img className="w-1/3" src={emptySvg} alt="no-users" />
          <h2 className="font-semibold text-xl mt-5 text-gray-800">
            No hay más usuarios
          </h2>
          <p className="text-sm text-gray-600 text-center">
            En el momento no hay mas usuarios registrados aparte del tuyo. Puedes agregar mas usuarios enviadoles una invitación
          </p>
        </div>
      )}
    </div>
  );
};

export default UsersList;

