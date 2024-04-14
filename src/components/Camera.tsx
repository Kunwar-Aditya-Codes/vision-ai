'use client';
import 'regenerator-runtime/runtime';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Circle, Send, Settings } from 'lucide-react';
import Link from 'next/link';
import useBoundStore from '@/store/store';
import Blind from './Blind';
import { FaCameraRotate } from 'react-icons/fa6';
import { fetchAnswer } from '@/lib/utils';
import toast, { Toaster } from 'react-hot-toast';

const Camera = () => {
  const { isBlind } = useBoundStore((state) => state);
  const [question, setQuestion] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>(
    'environment'
  );
  const [answer, setAnswer] = useState<string>('');

  const webcamRef = useRef<Webcam>(null);
  const [capture, setCapture] = useState<string>();

  const captureImage = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot() as string;
      setCapture(imageSrc);
    }
  }, [webcamRef]);

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
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
      setAnswer('Fetch failed!');
    } else {
      setAnswer(ans.answer);
    }
    setQuestion('');
  };

  return (
    <div className='h-full relative'>
      <Link
        href={'/settings'}
        className='absolute z-10 top-4 flex items-center justify-center  right-4 bg-gray-950 w-fit mx-auto rounded-full p-1.5'
      >
        <Settings className='size-6' />
      </Link>
      {capture ? (
        <div className='h-full md:flex object-cover'>
          <img
            src={capture}
            alt=''
            className='h-[50%] md:h-full md:w-[40%] w-full object-cover'
          />
          {isBlind ? (
            <Blind capture={capture} />
          ) : (
            <div className='flex flex-col md:flex-col-reverse gap-y-2 px-2 md:p-4 w-full'>
              <div className='mt-2 flex items-start md:items-end justify-between w-full gap-x-2'>
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className='w-full p-2 rounded-lg text-sm bg-transparent border'
                  placeholder='Ask about image... '
                />
                <Send
                  onClick={handleSubmit}
                  className='w-10 size-9 rounded-lg border p-2 cursor-pointer bg-white/5'
                />
              </div>

              <p className=''>{answer}</p>
            </div>
          )}
        </div>
      ) : null}

      {!capture ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            className='w-full h-full object-cover'
            videoConstraints={{
              facingMode: {
                exact: facingMode,
              }, // 'user' for front camera, 'environment' for back camera
            }}
          />
          <button
            onClick={captureImage}
            className='absolute bottom-20 flex items-center justify-center left-0 right-0 border-2 w-fit mx-auto rounded-full p-1'
          >
            <Circle className='size-12 bg-white rounded-full' />
          </button>

          <button
            onClick={toggleFacingMode}
            className='absolute bottom-20 flex items-center justify-center  left-8 border-2 w-fit mx-auto rounded-full p-1'
          >
            <FaCameraRotate className='size-8  rounded-full p-1' />
          </button>
        </>
      ) : null}

      <Toaster />
    </div>
  );
};
export default Camera;
