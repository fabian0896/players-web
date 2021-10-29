import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';

type Option = {
  value: string
  name: string
  disabled?: boolean
}

interface ListBoxProps {
  options: Option[],
  value: Option,
  onCange: (value: Option) => void
  label: string
}


const ListBoxComponent: React.FC<ListBoxProps> = ({ value, options, onCange, label }) => {
  
  return(
    <Listbox onChange={onCange} value={value}>
      <div className="relative">
        <Listbox.Label className="font-semibold text-sm text-gray-800 mb-2 block">
          {label}
        </Listbox.Label>
        <Listbox.Button className="py-2 px-3 text-gray-800 rounded flex items-center justify-between bg-gray-200 w-full text-left">
          {value.name}
          <FaChevronDown />
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="w-full mt-1 py-1 absolute bg-white rounded-md shadow-lg border">
            {options.map((opt) => (
              <Listbox.Option 
                key={opt.value} 
                value={opt}
                className={({ active }) => 
                  `${active ? 'bg-red-400 text-red-900 font-normal' : 'text-gray-800'}
                  py-2 pl-10 pr-4 relative cursor-default select-none`}
              >
                {({ selected }) => (
                  <Fragment>
                    <span 
                      className={`${selected ? 'font-medium' : 'font-normal'} block`}
                    >
                      {opt.name}
                    </span>
                    {selected && (
                      <span className={`absolute inset-y-0 left-0 flex items-center pl-3`}>
                        <FaCheck className="text-red-800" />
                      </span>
                    )}
                  </Fragment>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListBoxComponent;
