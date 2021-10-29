import React, { HTMLAttributes } from "react";
import { BiErrorCircle } from 'react-icons/bi';
import { Transition } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa';
import clsx from 'clsx'

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  children: string | null,
  success?: boolean,
  show?: boolean
}

const Message: React.FC<MessageProps> = ({ children, className, success, show }) => {
  const Icon = success ? FaCheck : BiErrorCircle;
  return(
    <Transition
      show={Boolean(show)}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <div className={clsx(className, `w-full bg-${success ? 'green' : 'red'}-200 rounded flex overflow-hidden`)}>
        <div className={`p-3 text-center ${success ? 'bg-green-600' : 'bg-red-600'}`}>
          <Icon className="text-white text-xl"/>
        </div>
        <div className={`text-sm ${success ? 'text-green-800' : 'text-red-800'} flex-1 p-3`}>
          {children}
        </div>
      </div>
    </Transition>
  );
};

export default Message;