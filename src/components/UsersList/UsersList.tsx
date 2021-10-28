import React from 'react';

import UserItem from './UserItem';

const UsersList: React.FC = () => {
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
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;

