import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Mic } from 'lucide-react';

const Blind = () => {
  const [question, setQuestion] = useState<string>('');
  const { transcript, isMicrophoneAvailable, listening } =
    useSpeechRecognition();

  const silenceTimeoutRef = useRef<NodeJS.Timeout>();

  const stopListening = () => SpeechRecognition.stopListening();

  const startListening = async () => {
    if (!isMicrophoneAvailable) {
      window.alert('Allow microphone access.');
      return;
    }

    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-IN',
    });

    silenceTimeoutRef.current = setTimeout(() => {
      stopListening();
    }, 5000);
  };

  useEffect(() => {
    setQuestion(transcript);

    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }

    silenceTimeoutRef.current = setTimeout(() => {
      stopListening();
      console.log('Auto-sending:', question);
    }, 5000);
  }, [transcript]);

  return (
    <div className='p-2'>
      <Mic
        onClick={startListening}
        className={cn(
          'size-9 rounded-lg border p-2 cursor-pointer bg-white/5',
          listening && 'bg-white text-black'
        )}
      />

      <div className='mt-2'>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className='w-full p-2 rounded-lg text-sm bg-transparent border'
          placeholder='Ask about image... '
        />
      </div>
    </div>
  );
};
export default Blind;
