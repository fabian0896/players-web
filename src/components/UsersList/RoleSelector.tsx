import { Menu } from "@headlessui/react";
import React from "react";
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import config from "../../config";
import { Role } from "../../react-app-env";

interface ItemProps {
  title: string
  checked?: boolean,
  onClick: (value: Role) => void
  value: Role
}

const Item: React.FC<ItemProps> = ({ title, checked, onClick, value }) => {
  return(
    <Menu.Item onClick={() => onClick(value)}>
      {({ active }) => (
        <div className="p-1">
          <button className={`${active ? 'bg-red-500 text-white' : 'text-gray-800'}
            flex items-center justify-between w-full py-2 px-2 text-left rounded-md box-border`}
          >
            {title}
            {checked && <FaCheck size={12} />}
          </button>
        </div>
      )}
    </Menu.Item>
  )
}

interface RoleSelectorProps {
  value: Role,
  onChange: (role: Role) => void
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange }) => {
  return(
    <Menu>
      <Menu.Button className="inline-flex items-center justify-center">
        <span>{config.roles.find((r) => r.value === value)?.name || 'Indefinido'}</span>
        <FaChevronDown size={12} className="ml-2" />
      </Menu.Button>
      <Menu.Items className="absolute z-30 outline-none border bg-white rounded-md shadow-lg w-40">
        {config.roles.map((role) => (
          <Item
            key={role.value}
            value={role.value}
            onClick={onChange} 
            title={role.name} 
            checked={value === role.value} />
        ))}   
      </Menu.Items>
    </Menu>
  );
};

export default RoleSelector;