import React, { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label?: string | undefined,
  icon?: IconType,
}

const Input:React.FC<InputProps> = ({className, label, icon: Icon, ...props}) => {
  return(
    <div className={className}>
      {
        label && (
          <label className="font-semibold text-sm text-gray-800 mb-2 block" htmlFor="">{label}</label>
        )
      }
      <div className="relative">
        {Icon && (
          <Icon className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-600 text-lg"/>
        )}
        <input
          className={`py-2 px-3 ${Icon ? 'pl-10' :  ''} rounded bg-gray-200 outline-none w-full border-2 border-transparent text-gray-800 transition focus:border-gray-500 placeholder-gray-500`}
          {...props}
        />
      </div>
    </div>
  )
};

export default Input;