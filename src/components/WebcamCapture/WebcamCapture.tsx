import React, { useState } from "react";
import Webcam from 'react-webcam';
import { FaCamera, FaSpinner, FaTimes } from 'react-icons/fa';

interface WebcameProps {
  onCapture?: (imageUrl: string | null) => void
  onCancel?: () => void
}

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user"
};

const WebcamCapture: React.FC<WebcameProps> = ({ onCapture, onCancel }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const webcamRef = React.useRef<Webcam>(null);

  const capture = React.useCallback(
    () => {
      if (!webcamRef.current) {
        return;
      }
      const imageSrc = webcamRef.current.getScreenshot({ height: 720, width: 720 });
      onCapture && onCapture(imageSrc);
    },
    [webcamRef, onCapture]
  );

  return (
    <div className="mt-5 relative">
      <div className="rounded-lg overflow-hidden shadow aspect-w-1 aspect-h-1">
        <Webcam
          audio={false}
          height={720}
          width={720}
          screenshotQuality={1}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onCanPlay={() => setLoading(false)}
        />
        {
          loading && (
          <div className="absolute inset-0  bg-gray-200 flex justify-center items-center">
              <FaSpinner size={80} className="text-red-500 animate-spin" />
          </div>
          )
        }
      </div>
      <div className="flex justify-center mt-5 space-x-5">
        <button
          className="w-12 h-12 rounded-full bg-red-500 text-white flex justify-center items-center shadow" 
          onClick={capture}
        >
          <FaCamera />
        </button>
        <button
          className="w-12 h-12 rounded-full bg-gray-500 text-white flex justify-center items-center shadow" 
          onClick={onCancel}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default WebcamCapture;
