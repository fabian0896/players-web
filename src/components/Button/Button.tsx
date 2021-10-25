import React, { ButtonHTMLAttributes } from "react";
import clsx from 'clsx';
import { IconType } from "react-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: string
  icon?: IconType
  full?: boolean
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon: 
  Icon, 
  full, 
  className, 
  disabled, 
  ...props 
}) => {
  return(
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        className,
        'py-2 px-4 flex items-center justify-center space-x-3 rounded text-white font-semibold transition outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
        {'bg-red-300': disabled, 'bg-red-500 hover:bg-red-800': !disabled, 'w-full': full}
      )}
    >
      {Icon && <Icon className="text-xl" /> }
      <span>{children}</span>
    </button>
  )
}

export default Button;