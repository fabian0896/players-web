import React from 'react';

import { UsersList, UserInvite } from '../../components';
import { useAuth } from '../../context/auth';
import { Invite } from '../../react-app-env';
import { AuthService } from '../../services';

const Users: React.FC = () => {
  const { token } = useAuth();

  const handleInvite = async (values: Invite) => {
    const data = await AuthService.invite(values, token);
    console.log(data);
  }

  return(
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-2 place-self-start w-full">
            <UserInvite onInvite={handleInvite} />
          </div>
          <div className="col-span-3">
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
