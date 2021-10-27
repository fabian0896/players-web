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
        'py-2 px-4 flex items-center justify-center space-x-3 rounded font-semibold transition outline-none focus:ring-2 focus:ring-offset-2',
      )}
    >
      {Icon && <Icon className="text-xl" /> }
      <span>{children}</span>
    </button>
  )
}

export default Button;