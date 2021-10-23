import React, { HTMLAttributes } from "react";
import { BiErrorCircle } from 'react-icons/bi';
import clsx from 'clsx'

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  children: string,
}

const Message: React.FC<MessageProps> = ({ children, className }) => {
  return(
    <div className={clsx(className, 'w-full bg-red-200 rounded flex overflow-hidden')}>
      <div className="p-3 text-center bg-red-600">
        <BiErrorCircle className="text-white text-xl"/>
      </div>
      <div className="text-sm text-red-800 flex-1 p-3">
        {children}
      </div>
    </div>
  );
};

export default Message;