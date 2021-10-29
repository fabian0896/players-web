import React from "react";
import { Switch } from "..";
import RoleSelector from "./RoleSelector";

const UserItem: React.FC = () => {
  return(
    <tr className="border-b">
      <td className="p-3">
        <div className="flex space-x-3 items-center">
          <div className="w-10 h-10 bg-gray-800 rounded-full shadow-md">

          </div>
          <div>
            <p className="text-gray-800">Fabian David Dueñas Garcia</p>
            <p className="text-sm text-gray-600">fabian0896@outlook.com</p>
          </div>
        </div>
      </td>
      <td className="text-center">
        <RoleSelector />
      </td>
      <td className="text-center">
        <span className="">
          <Switch />
        </span>
      </td>
    </tr>
  );
};

export default UserItem;
