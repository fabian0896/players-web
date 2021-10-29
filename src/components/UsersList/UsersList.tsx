import React from 'react';
import { UpdateUserValues, User } from '../../react-app-env';

import UserItem from './UserItem';

interface UsersListProps {
  users: User[],
  onUpdate: (id: number | string, values: UpdateUserValues) => Promise<void>,
}

const UsersList: React.FC<UsersListProps> = ({ users, onUpdate }) => {
  return(
    <div className="bg-white shadow-lg rounded-lg">
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
    </div>
  );
};

export default UsersList;

