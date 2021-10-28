import React from 'react';

import { UsersList } from '../../components';

const Users: React.FC = () => {
  return(
    <div>
      <div className="max-w-2xl mx-auto">
        <UsersList />
      </div>
    </div>
  );
};

export default Users;
