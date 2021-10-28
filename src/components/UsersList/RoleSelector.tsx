import { Menu } from "@headlessui/react";
import React from "react";
import { FaChevronDown } from 'react-icons/fa';

interface ItemProps {
  title: string
}

const Item: React.FC<ItemProps> = ({ title }) => {
  return(
    <Menu.Item onClick={() => console.log('seleccionado')}>
      {({ active }) => (
        <div className="p-1">
          <button className={`${active ? 'bg-red-500 text-white' : 'text-gray-800'}
            block w-full py-2 px-2 text-left rounded-md box-border`}
          >
            {title}
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
      <Menu.Items className="absolute outline-none border bg-white rounded-md shadow-lg w-40">
          <Item title="Administrador" />
          <Item title="Editor" />
          <Item title="Lector" />     
      </Menu.Items>
    </Menu>
  );
};

export default RoleSelector;