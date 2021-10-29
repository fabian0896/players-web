import React, { Fragment, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { Transition } from '@headlessui/react';

interface LoadingProps {
  loading?: boolean,
  message?: string,
}

const Loader: React.FC<LoadingProps> = ({ loading, message }) => {
  return(
    <Transition
      show={loading}
      as={Fragment}
      enter="transition duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-60"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-70"
      leaveTo="opacity-0"
    >
      <div className="absolute bg-gray-800 opacity-70 inset-0 z-20 flex flex-col justify-center items-center rounded-lg">
        <FaSpinner className="text-white animate-spin mb-5" size={50} />
        <p className="text-white">{message}</p>
      </div>
    </Transition>
  );
};

export default Loader;
