import React, { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label?: string | undefined,
  icon?: IconType,
  error?: boolean | string,
}

const Input:React.FC<InputProps> = ({className, label, icon: Icon, error, ...props}) => {
  return(
    <div className={className}>
      {
        label && (
          <label className={`font-semibold text-sm ${error ? 'text-red-500' : 'text-gray-800'} mb-2 block`} htmlFor="">{label}</label>
        )
      }
      <div className="relative">
        {Icon && (
          <Icon className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-600 text-lg"/>
        )}
        <input
          className={`py-2 px-3 ${Icon ? 'pl-10' :  ''} rounded ${error ? 'bg-red-100' : 'bg-gray-200'} outline-none w-full border-2 ${error ? 'border-red-500' : 'border-transparent'} text-gray-800 transition ${ error ? '' : 'focus:border-gray-600' } placeholder-gray-500`}
          {...props}
        />
      </div>
    </div>
  )
};

export default Input;