// components/AudioCapture.js
import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPlay, FaRedo, FaTrash } from 'react-icons/fa';

function AudioCapture() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [recordingLength, setRecordingLength] = useState(0);
    const [recorder, setRecorder] = useState(null);
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

    const handlePlayAudio = () => {
        const audio = new Audio(audioURL);
        audio.play();
    };

    const handleReRecord = () => {
        setAudioURL(null);
        setRecordingLength(0);
        toggleRecording();
    };

    useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);

    return (
        <div className="flex flex-col items-center p-2 space-y-2 bg-gray-100 rounded-lg">
            {/* Recording Control */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={toggleRecording}
                    className={`p-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white`}
                >
                    {isRecording ? <FaStop size={18} /> : <FaMicrophone size={18} />}
                </button>

                {/* Recording length display */}
                <div className="text-gray-700 font-semibold text-sm">
                    {Math.floor(recordingLength / 60).toString().padStart(2, '0')}:{(recordingLength % 60).toString().padStart(2, '0')}
                </div>
            </div>

            {/* Audio Controls */}
            {audioURL && (
                <div className="flex items-center space-x-2 mt-2">
                    <button onClick={handlePlayAudio} className="p-2 bg-blue-500 text-white rounded-full">
                        <FaPlay size={16} />
                    </button>
                    <button onClick={handleReRecord} className="p-2 bg-yellow-500 text-white rounded-full">
                        <FaRedo size={16} />
                    </button>
                    <button onClick={() => setAudioURL(null)} className="p-2 bg-red-500 text-white rounded-full">
                        <FaTrash size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default AudioCapture;
