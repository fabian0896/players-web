import React from "react";
import { Switch } from "..";
import { Role, UpdateUserValues, User } from "../../react-app-env";
import { startCase } from "../../utils";
import RoleSelector from "./RoleSelector";

interface UserItemProps {
  user: User,
  onUpdate: (id: number | string, values: UpdateUserValues) => Promise<void>
};

const UserItem: React.FC<UserItemProps> = ({ user, onUpdate }) => {
  const handleChangeActive = async (active: boolean) => {
    await onUpdate(user.id, { active });
  }

  const handleChangeRole = async (role: Role) => {
    await onUpdate(user.id, { role });
  }

  return(
    <tr className="border-b">
      <td className="p-3">
        <div className="flex space-x-3 items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full shadow-md overflow-hidden">
            <img
              className="w-full h-full object-cover" 
              src={user.avatar} 
              alt={user.name} 
            />
          </div>
          <div>
            <p className="text-gray-800">{startCase(user.name)}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="text-center p-3">
        <RoleSelector value={user.role} onChange={handleChangeRole} />
      </td>
      <td className="text-center p-3">
        <span className="">
          <Switch onChange={handleChangeActive} value={user.active} />
        </span>
      </td>
    </tr>
  );
};

export default UserItem;
