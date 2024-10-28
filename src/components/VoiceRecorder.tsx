import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Pause, Play, Loader2, X, Send } from 'lucide-react';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob, transcription: string) => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onRecordingComplete,
  onCancel,
  isProcessing = false
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    return () => cleanup();
  }, []);

  const cleanup = () => {
    stopRecording();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContext) {
      audioContext.close();
    }
  };

  const drawWaveform = () => {
    if (!canvasRef.current || !analyser || !dataArray) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    analyser.getByteTimeDomainData(dataArray);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0066FF';
    ctx.beginPath();

    const sliceWidth = width / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();

    if (!isPaused && isRecording) {
      animationFrameRef.current = requestAnimationFrame(drawWaveform);
    }
  };

  const initializeAudioContext = async (stream: MediaStream) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = ctx.createMediaStreamSource(stream);
      const analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 2048;
      source.connect(analyserNode);

      setAudioContext(ctx);
      setAnalyser(analyserNode);
      setDataArray(new Uint8Array(analyserNode.frequencyBinCount));

      return true;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      return false;
    }
  };

  const startRecording = async () => {
    try {
      cleanup(); // Clean up any existing recording session

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;

      const audioContextInitialized = await initializeAudioContext(stream);
      if (!audioContextInitialized) {
        throw new Error('Failed to initialize audio context');
      }

      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        
        setIsTranscribing(true);
        try {
          // Mock transcription for demo
          await new Promise(resolve => setTimeout(resolve, 1000));
          const mockTranscription = "This is what you just said in your voice message.";
          setTranscription(mockTranscription);
        } catch (error) {
          setError('Failed to transcribe audio');
        } finally {
          setIsTranscribing(false);
        }
      };

      recorder.start(100);
      setIsRecording(true);
      setIsPaused(false);
      setError(null);

      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

      drawWaveform();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Please allow microphone access to record audio');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      drawWaveform();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleSubmit = () => {
    if (audioBlob && transcription) {
      onRecordingComplete(audioBlob, transcription);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
      
      <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {isProcessing || isTranscribing ? (
              <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-bolt-blue animate-spin" />
              </div>
            ) : isRecording ? (
              <div className="flex items-center gap-2">
                {isPaused ? (
                  <button
                    onClick={resumeRecording}
                    className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center hover:bg-bolt-blue/20 transition-colors"
                  >
                    <Play className="w-5 h-5 text-bolt-blue" />
                  </button>
                ) : (
                  <button
                    onClick={pauseRecording}
                    className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center hover:bg-bolt-blue/20 transition-colors"
                  >
                    <Pause className="w-5 h-5 text-bolt-blue" />
                  </button>
                )}
                <button
                  onClick={stopRecording}
                  className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                >
                  <Square className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={startRecording}
                className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center hover:bg-bolt-blue/20 transition-colors"
              >
                <Mic className="w-5 h-5 text-bolt-blue" />
              </button>
            )}
            
            <div>
              <p className="text-white font-medium">
                {isProcessing ? 'Processing...' : 
                 isTranscribing ? 'Transcribing...' :
                 isRecording ? 'Recording...' : 
                 'Record Message'}
              </p>
              {isRecording && (
                <p className="text-sm text-bolt-gray-400">
                  {formatDuration(duration)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {audioBlob && transcription && !isTranscribing && (
              <button
                onClick={handleSubmit}
                className="p-2 rounded-lg bg-bolt-blue text-white hover:bg-bolt-purple transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onCancel}
              className="p-2 rounded-lg hover:bg-bolt-gray-800/50 transition-colors text-bolt-gray-400 hover:text-white"
              disabled={isProcessing || isTranscribing}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isRecording && (
          <div className="mt-4">
            <canvas
              ref={canvasRef}
              width={600}
              height={100}
              className="w-full h-20 bg-bolt-gray-800/50 rounded-lg"
            />
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500 text-sm">
            {error}
          </div>
        )}

        {transcription && !isTranscribing && (
          <div className="mt-4 p-3 bg-bolt-gray-800/50 rounded-lg">
            <p className="text-sm text-bolt-gray-300">Transcription:</p>
            <p className="text-white">{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;