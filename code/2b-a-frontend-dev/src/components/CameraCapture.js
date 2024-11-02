import React, { useState, useEffect, useRef } from 'react';

const CameraCapture = ({ onCapture }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start or Stop the camera
  const toggleCamera = async () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      await startCamera();
    }
  };

  const startCamera = async () => {
    const constraints = {
      video: { facingMode: "environment" } // Prefer the front camera
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(stream);
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing the front camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  const handleCaptureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = canvas.toDataURL('image/png');
      onCapture(imageData);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-gray-200 rounded-lg p-2">
      {/* Camera Feed */}
      <div className="w-full flex justify-center items-center">
        <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }} className="rounded-md" />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Controls in a Single Row */}
      <div className="mt-2 flex space-x-4">
        <button
          onClick={toggleCamera}
          className={`px-4 py-2 rounded-md text-white ${isCameraActive ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {isCameraActive ? 'Stop Camera' : 'Start Camera'}
        </button>
        {isCameraActive && (
          <button
            onClick={handleCaptureImage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Capture Image
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
