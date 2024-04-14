import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { cn, fetchAnswer } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Blind = ({ capture }: { capture: string }) => {
  const [question, setQuestion] = useState<string>('');
  const { transcript, isMicrophoneAvailable, listening } =
    useSpeechRecognition();
  const [answer, setAnswer] = useState<string>('');

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

  const handleSubmit = async () => {
    if (!capture) {
      toast.error('No image found!', {
        duration: 1500,
      });
      return;
    }

    if (!question) {
      toast.error('No question found!', {
        duration: 1500,
      });
      return;
    }

    const res = await fetchAnswer({ imageData: capture, question });

    const ans = await res.json();

    if (ans.success === false) {
      setAnswer('Error. Try again!');
      speakAnswer('Error. Try again!');
    } else {
      setAnswer(ans.answer);
      speakAnswer(ans.answer);
    }
    setQuestion('');
  };

  useEffect(() => {
    setQuestion(transcript);

    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }

    silenceTimeoutRef.current = setTimeout(() => {
      stopListening();
      handleSubmit();
      console.log('submit');
    }, 3000);
  }, [transcript]);

  const speakAnswer = (text: string) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className='p-2 md:p-4 w-full flex flex-col justify-end'>
      <div className='flex items-center justify-between'>
        <Mic
          onClick={startListening}
          className={cn(
            'size-9 rounded-lg border p-2 cursor-pointer bg-white/5',
            listening && 'bg-white text-black'
          )}
        />
        <Volume2
          onClick={() => speakAnswer(answer)}
          className={cn(
            'size-9 rounded-lg border p-2 cursor-pointer bg-white/5'
          )}
        />
      </div>

      <div className='mt-2'>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className='w-full p-2 rounded-lg text-sm bg-transparent border'
          placeholder='Ask about image... '
        />
      </div>

      <p>{answer}</p>
    </div>
  );
};
export default Blind;
