import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function CameraCapture() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [images, setImages] = useState([]);
  const [currentEditingImage, setCurrentEditingImage] = useState(null);
  const [annotations, setAnnotations] = useState([]);
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
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(stream);
    videoRef.current.srcObject = stream;
    setIsCameraActive(true);
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

      const timestamp = new Date();
      const newImage = {
        id: images.length + 1,
        src: canvas.toDataURL('image/png'),
        timestamp,
        annotations: [],
      };
      setImages([...images, newImage]);
    }
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };

  const handleEditImage = (image) => {
    setCurrentEditingImage(image);
  };

  const handleAddAnnotation = (text) => {
    setAnnotations([...annotations, text]);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row items-start p-4 space-y-4 md:space-y-0 md:space-x-4">
      {/* Camera Feed and Controls */}
      <div className="w-2/3 md:w-2/3 flex flex-col items-center bg-gray-200 rounded-lg p-4">
        <video ref={videoRef} autoPlay className="w-full rounded-md" />
        <canvas ref={canvasRef} className="hidden" />
        
        <button
          onClick={toggleCamera}
          className={`mt-4 px-4 py-2 rounded-md text-white ${isCameraActive ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {isCameraActive ? 'Stop Camera' : 'Start Camera'}
        </button>

        {isCameraActive && (
          <button
            onClick={handleCaptureImage}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Capture Image
          </button>
        )}
      </div>

      {/* Gallery and Editing Tools */}
      <div className="w-1/3 bg-gray-100 p-4 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Gallery</h2>
        <div className="flex flex-col space-y-2">
          {images.map((image, index) => (
            <div key={image.id} className="relative bg-white p-2 rounded-md shadow-md">
              <p className="text-sm font-bold text-gray-600">Image {index + 1}</p>
              <img src={image.src} alt="Captured" className="w-full h-64 object-cover rounded-md" />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEditImage(image)}
                  className="text-blue-500"
                >
                  <FaEdit className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDeleteImage(image.id)}
                  className="text-red-500"
                >
                  <FaTrash className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-gray-600">Timestamp: {image.timestamp.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Editing Panel */}
        {currentEditingImage && (
          <div className="bg-gray-200 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-semibold">Edit Image</h3>
            <img src={currentEditingImage.src} alt="Editing" className="w-full h-32 object-cover rounded-md" />
            <input
              type="text"
              placeholder="Add annotation"
              className="mt-2 px-2 py-1 border rounded-md w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddAnnotation(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <div className="mt-2">
              {annotations.map((text, index) => (
                <span key={index} className="text-sm bg-yellow-200 px-2 py-1 rounded-md inline-block mr-2">
                  {text}
                </span>
              ))}
            </div>
            <button
              onClick={() => setCurrentEditingImage(null)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Done Editing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CameraCapture;
