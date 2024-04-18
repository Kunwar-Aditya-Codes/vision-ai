import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { cn, fetchAnswer } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Loader2, Mic, Send, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Blind = ({ capture }: { capture: string }) => {
  const [question, setQuestion] = useState<string>('');
  const {
    isMicrophoneAvailable,
    listening,
    finalTranscript,
    resetTranscript,
    interimTranscript,
    transcript,
  } = useSpeechRecognition();
  const [answer, setAnswer] = useState<string>('');
  const [chatQuestion, setChatQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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

    silenceTimeoutRef.current = setTimeout(stopListening, 3000);
  };

  const handleSubmit = async () => {
    setLoading(true);

    setChatQuestion(question);

    setQuestion('');

    if (!capture) {
      toast.error('No image found!', {
        duration: 1500,
      });
      setLoading(false);
      return;
    }

    const res = await fetchAnswer({ imageData: capture, question });
    const ans = await res.json();

    setAnswer(ans.success ? ans.answer : 'Error. Try again!');
    speakAnswer(ans.success ? ans.answer : 'Error. Try again!');

    resetTranscript();
    setLoading(false);
  };

  useEffect(() => {
    if (finalTranscript.trim() !== '') {
      setQuestion(transcript);
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = setTimeout(() => {
        stopListening();
      }, 3000);
    }
  }, [interimTranscript, finalTranscript]);

  // useEffect(() => {
  //   if (finalTranscript !== '') {
  //     setQuestion((prevQuestion) => prevQuestion + ' ' + finalTranscript);
  //     if (silenceTimeoutRef.current) {
  //       clearTimeout(silenceTimeoutRef.current);
  //     }
  //     silenceTimeoutRef.current = setTimeout(() => {
  //       stopListening();
  //       handleSubmit();
  //     }, 3000);
  //   }
  // }, [finalTranscript]);

  const speakAnswer = (text: string) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className='p-2 md:p-4 w-full flex flex-col grow h-full   md:mt-16'>
      <div className='flex items-center justify-between'>
        <Mic
          onClick={startListening}
          className={cn(
            'size-11 md:size-9 rounded-lg border p-2 cursor-pointer bg-white/5',
            listening && 'bg-white text-black'
          )}
        />
        <Volume2
          onClick={() => speakAnswer(answer)}
          className={cn(
            'size-11 md:size-9 rounded-lg border p-2 cursor-pointer bg-white/5'
          )}
        />
      </div>

      <div className='flex flex-col h-full justify-end gap-y-2 mt-2 w-full'>
        <div className='border border-white/15 md:mt-12 grow flex flex-col justify-end rounded-lg p-4'>
          <div className='grid grid-cols-1 gap-y-2 '>
            <div className='flex items-end justify-end'>
              {chatQuestion && (
                <p className='bg-white text-zinc-950 px-4 py-1 rounded-full'>
                  {chatQuestion}
                </p>
              )}
            </div>
            {loading ? (
              <span className='animate-pulse'>Generating response...</span>
            ) : (
              <div>{answer}</div>
            )}
          </div>
        </div>
        <div className='mt-2 flex items-start gap-x-2'>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className='w-full p-2 rounded-lg text-sm bg-transparent border'
            placeholder='Ask about image... '
          />
          {loading ? (
            <div className='size-9 flex items-center justify-center  rounded-lg border p-2 bg-white/5 '>
              <Loader2 className='animate-spin ' />
            </div>
          ) : (
            <Send
              onClick={handleSubmit}
              className='w-10 size-9 rounded-lg border p-2 cursor-pointer bg-white/5'
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Blind;
