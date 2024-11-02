import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPlay, FaRedo, FaTrash } from 'react-icons/fa';

function AudioCapture() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [recordingLength, setRecordingLength] = useState(0);
    const [recorder, setRecorder] = useState(null);
    const [recordings, setRecordings] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    // Start or stop recording
    const toggleRecording = async () => {
        if (isRecording) {
            stopRecording();
        } else {
            await startRecording();
        }
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
            const newAudioURL = URL.createObjectURL(e.data);
            setAudioURL(newAudioURL);

            // Add new recording to the list
            setRecordings(prevRecordings => [
                ...prevRecordings,
                { id: prevRecordings.length + 1, src: newAudioURL }
            ]);
        };

        mediaRecorder.start();
        setRecorder(mediaRecorder);
        setIsRecording(true);

        // Start tracking recording length
        const id = setInterval(() => {
            setRecordingLength((prev) => prev + 1);
        }, 1000);
        setIntervalId(id);
    };

    const stopRecording = () => {
        if (recorder) {
            recorder.stop();
            recorder.stream.getTracks().forEach(track => track.stop());
            setRecorder(null);
            setIsRecording(false);
            clearInterval(intervalId);
            setIntervalId(null);
            setRecordingLength(0);
        }
    };

    const handlePlayAudio = (src) => {
        const audio = new Audio(src);
        audio.play();
    };

    const handleReRecord = () => {
        setAudioURL(null);
        setRecordingLength(0);
        toggleRecording();
    };

    const handleDeleteRecording = (id) => {
        setRecordings(recordings.filter(record => record.id !== id));
    };

    useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);

    return (
        <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 rounded-lg">
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleRecording}
                    className={`px-4 py-2 rounded-md text-white ${isRecording ? 'bg-red-500' : 'bg-green-500'}`}
                >
                    {isRecording ? (
                        <>
                            <FaStop className="w-5 h-5 mr-2 inline" />
                            Stop Recording
                        </>
                    ) : (
                        <>
                            <FaMicrophone className="w-5 h-5 mr-2 inline" />
                            Start Recording
                        </>
                    )}
                </button>

                {/* Recording length display */}
                <div className="text-gray-700 font-semibold">
                    {Math.floor(recordingLength / 60)
                        .toString()
                        .padStart(2, '0')}:{(recordingLength % 60).toString().padStart(2, '0')}
                </div>
            </div>

            {/* Audio Gallery */}
            <div className="w-full bg-gray-100 p-4 rounded-lg space-y-4">
                <h2 className="text-xl font-semibold">Recordings Gallery</h2>
                <div className="flex flex-col space-y-2">
                    {recordings.map(record => (
                        <div key={record.id} className="flex flex-col items-center space-y-2 mt-4">
                            <audio src={record.src} controls className="w-full" />

                            <div className="flex space-x-4">
                                <button onClick={() => handlePlayAudio(record.src)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                    <FaPlay className="w-5 h-5 mr-2 inline" />
                                    Play
                                </button>
                                <button onClick={handleReRecord} className="px-4 py-2 bg-yellow-500 text-white rounded-md">
                                    <FaRedo className="w-5 h-5 mr-2 inline" />
                                    Re-record
                                </button>
                                <button onClick={() => handleDeleteRecording(record.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">
                                    <FaTrash className="w-5 h-5 mr-2 inline" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AudioCapture;
