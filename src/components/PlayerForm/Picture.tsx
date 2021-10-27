import React from "react";
import { FcAddImage } from 'react-icons/fc'

interface PictureProps {
  onClick: () => void
  picture: string | null,
}

const Picture: React.FC<PictureProps> = ({ onClick, picture }) => {
  return(
    <div className="flex justify-center pb-6">
      <div 
        onClick={onClick} 
        className={`cursor-pointer w-52 h-52 shadow bg-gray-200 ${ picture ? 'ring-2' : '' } ring-offset-2 ring-red-500 mr-6 overflow-hidden rounded-lg flex items-center justify-center ${ picture ? '' : 'border-gray-500 border-2 border-dashed'}`}
      >
        {
          picture ? (
            <img className="w-full h-full object-cover" src={picture} alt="profile" />
          ) : (
            <FcAddImage size={50} />
          )
        }
      </div>
    </div>
  );
};

export default Picture;
