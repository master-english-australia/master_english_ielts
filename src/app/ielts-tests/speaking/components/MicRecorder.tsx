import MicIcon from '@mui/icons-material/Mic';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';

interface MicRecorderProps {
  isSubmitted: boolean;
  onAudioRecorded?: (audioURL: string | null) => void;
}

export const MicRecorder = ({ isSubmitted, onAudioRecorded }: MicRecorderProps) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [record, setRecord] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startRecording = async () => {
    setError(null);
    setAudioURL(null);
    setAudioChunks([]);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecord(true);
      mediaRecorder.ondataavailable = (e) => {
        setAudioChunks((prev) => [...prev, e.data]);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks.concat(), { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setRecord(false);
        setAudioChunks([]);
        stream.getTracks().forEach((track) => track.stop());
        if (onAudioRecorded) onAudioRecorded(url);
      };
    } catch (err) {
      setError('マイクの利用が許可されていません。');
      setRecord(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && record) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
      <Button
        variant={record ? 'contained' : 'outlined'}
        color={record ? 'error' : 'primary'}
        onClick={record ? stopRecording : startRecording}
        sx={{
          mt: 2,
          width: 64,
          height: 64,
          minWidth: 0,
          minHeight: 0,
          borderRadius: '50%',
          p: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: record ? 4 : 1,
          fontSize: 32,
        }}
        disabled={isSubmitted}
      >
        <MicIcon sx={{ fontSize: 36, color: record ? 'white' : 'inherit' }} />
      </Button>
      {audioURL && (
        <audio controls src={audioURL} style={{ marginTop: 12 }} />
      )}
      {error && (
        <Box sx={{ color: 'red', mt: 1 }}>{error}</Box>
      )}
    </Box>
  );
}; 