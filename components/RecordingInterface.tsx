'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause } from 'lucide-react';
import { Button } from './ui/Button';
import { formatDuration } from '@/lib/utils';

interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioBlob?: Blob;
}

export function RecordingInterface() {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: 'audio/webm' 
        });
        setRecordingState(prev => ({ ...prev, audioBlob }));
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000); // Collect data every second

      setRecordingState(prev => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        duration: 0,
      }));

      // Start duration timer
      intervalRef.current = setInterval(() => {
        setRecordingState(prev => ({
          ...prev,
          duration: prev.duration + 1,
        }));
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop();
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setRecordingState(prev => ({
        ...prev,
        isRecording: false,
        isPaused: false,
      }));
    }
  };

  // Pause/Resume recording
  const togglePause = () => {
    if (mediaRecorderRef.current) {
      if (recordingState.isPaused) {
        mediaRecorderRef.current.resume();
        // Resume timer
        intervalRef.current = setInterval(() => {
          setRecordingState(prev => ({
            ...prev,
            duration: prev.duration + 1,
          }));
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        // Pause timer
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }

      setRecordingState(prev => ({
        ...prev,
        isPaused: !prev.isPaused,
      }));
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (mediaRecorderRef.current && recordingState.isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [recordingState.isRecording]);

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card">
      {/* Recording Visualizer */}
      <div className="flex flex-col items-center space-y-4">
        <div className={`
          w-24 h-24 rounded-full flex items-center justify-center transition-smooth
          ${recordingState.isRecording 
            ? 'bg-red-500 recording-pulse' 
            : 'bg-gray-100 hover:bg-gray-200'
          }
        `}>
          <Mic className={`
            w-8 h-8 transition-smooth
            ${recordingState.isRecording ? 'text-white' : 'text-gray-600'}
          `} />
        </div>

        {/* Duration Display */}
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">
            {formatDuration(recordingState.duration)}
          </div>
          <div className="text-sm text-text-secondary">
            {recordingState.isRecording 
              ? recordingState.isPaused 
                ? 'Recording paused' 
                : 'Recording in progress...'
              : 'Ready to record'
            }
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          {!recordingState.isRecording ? (
            <Button
              onClick={startRecording}
              variant="primary"
              size="lg"
              className="px-8"
            >
              <Mic className="w-5 h-5 mr-2" />
              Start Recording
            </Button>
          ) : (
            <>
              <Button
                onClick={togglePause}
                variant="secondary"
                size="md"
              >
                {recordingState.isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </Button>
              
              <Button
                onClick={stopRecording}
                variant="primary"
                size="md"
                className="bg-red-500 hover:bg-red-600"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </>
          )}
        </div>

        {/* Recording completed message */}
        {recordingState.audioBlob && !recordingState.isRecording && (
          <div className="text-center p-4 bg-green-50 rounded-md border border-green-200">
            <p className="text-sm text-green-800 font-medium">
              Recording completed! Processing transcription...
            </p>
            <p className="text-xs text-green-600 mt-1">
              Duration: {formatDuration(recordingState.duration)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
