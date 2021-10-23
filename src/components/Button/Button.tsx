import React, { ButtonHTMLAttributes } from "react";
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: string
}

const Button: React.FC<ButtonProps> = ({ children, className, disabled, ...props }) => {
  return(
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        className,
        'py-2 px-3 w-full  rounded text-white font-semibold transition outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
        {'bg-red-300': disabled, 'bg-red-500 hover:bg-red-800': !disabled}
      )}
    >
      {children}
    </button>
  )
}

export default Button;