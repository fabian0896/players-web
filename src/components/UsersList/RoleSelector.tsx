import { Menu } from "@headlessui/react";
import React from "react";
import { FaChevronDown, FaCheck } from 'react-icons/fa';

interface ItemProps {
  title: string
  checked?: boolean
}

const Item: React.FC<ItemProps> = ({ title, checked }) => {
  return(
    <Menu.Item onClick={() => console.log('seleccionado')}>
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


const RoleSelector: React.FC = () => {
  return(
    <Menu>
      <Menu.Button className="inline-flex items-center justify-center">
        <span>Administrador</span>
        <FaChevronDown size={12} className="ml-2" />
      </Menu.Button>
      <Menu.Items className="absolute z-30 outline-none border bg-white rounded-md shadow-lg w-40">
          <Item title="Administrador" />
          <Item title="Editor" checked />
          <Item title="Lector" />     
      </Menu.Items>
    </Menu>
  );
};

export default RoleSelector;