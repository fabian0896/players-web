import React from "react";
import { FaSpinner } from 'react-icons/fa';
import { Transition } from '@headlessui/react';

interface LoadingOverlayProps {
  loading: boolean,
  message?: string,
}

const LoadingOverLay: React.FC<LoadingOverlayProps> = ({ loading, message }) => {
  return (
    <Transition
      show={loading}
      as="div"
      enter="transition duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-60"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-70"
      leaveTo="opacity-0"
      className="fixed inset-0 bg-gray-800 opacity-70 transition z-50 flex items-center justify-center flex-col"
    >
        <FaSpinner className="text-red-500 animate-spin" size={50} />
        <p className="mt-5 text-white">{message}</p>
    </Transition>
  );
};

export default LoadingOverLay;