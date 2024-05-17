'use client';
import 'regenerator-runtime/runtime';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Circle, FileImage, Loader2, Send, Settings, X } from 'lucide-react';
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
  const [loading, setLoading] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [capture, setCapture] = useState<string>();
  const [chatQuestion, setChatQuestion] = useState<string>('');

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

    const res = await fetchAnswer({
      imageData: capture,
      question,
    });

    //* NEW CODE
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let result = '';
    let prevChunk = '';
    while (true) {
      const { done, value } = await reader!.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      if (chunk !== prevChunk) {
        result += chunk;
        setAnswer(result);
        prevChunk = chunk;
      }
    }

    //* LEGACY
    // const ans = await res.json();
    // if (ans.success === false) {
    //   setAnswer('Fetch failed!');
    // } else {
    //   setAnswer(ans.answer);
    // }

    setLoading(false);
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setCapture(reader.result as string);
      };
    }
  };

  const handleReset = () => {
    setCapture('');
    setChatQuestion('');
    setAnswer('');
  };

  return (
    <div className='h-full relative'>
      <div>
        {capture ? (
          <button
            onClick={handleReset}
            className='absolute z-10 top-4 flex items-center justify-center left-4 bg-gray-950 w-fit mx-auto rounded-full p-1.5'
          >
            <X className='size-6' />
          </button>
        ) : null}
        <Link
          href={'/settings'}
          className='absolute z-10 top-4 flex items-center justify-center  right-4 bg-gray-950 w-fit mx-auto rounded-full p-1.5'
        >
          <Settings className='size-6' />
        </Link>
      </div>

      {capture ? (
        <div className='h-full flex flex-col md:flex-row object-cover'>
          <div className='h-[50%] flex items-center justify-center  md:h-full md:w-[70%] w-full bg-[url("https://media.istockphoto.com/id/1403848173/vector/vector-online-chatting-pattern-online-chatting-seamless-background.jpg?s=612x612&w=0&k=20&c=W3O15mtJiNlJuIgU6S9ZlnzM_yCE27eqwTCfXGYwCSo=")] bg-zinc-950/90 bg-blend-color p-4 object-contain'>
            <img src={capture} alt='' className='rounded-xl max-w-[75%]' />
          </div>
          {isBlind ? (
            <Blind capture={capture} />
          ) : (
            <div className='flex flex-col h-full justify-end gap-y-2 p-4 w-full'>
              <div className='border border-white/15 md:mt-12 grow flex flex-col justify-end rounded-lg p-4'>
                <div className='grid grid-cols-1 gap-y-2 '>
                  <div className='flex items-end justify-end'>
                    {chatQuestion && (
                      <p className='bg-white text-zinc-950 px-4 py-1 rounded-full'>
                        {chatQuestion}
                      </p>
                    )}
                  </div>
                  <div>{answer}</div>
                  {/* {loading ? (
                    <span className='animate-pulse'>
                      Generating response...
                    </span>
                  ) : (
                    <div>{answer}</div>
                  )} */}
                </div>
              </div>

              <div className='mt-2 flex items-start md:items-end justify-between w-full gap-x-2'>
                <input
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
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

          <button className='absolute bottom-20 flex items-center justify-center  right-8 border-2 w-fit mx-auto rounded-full p-1 cursor-pointer'>
            <input
              type='file'
              accept='image/jpeg'
              className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
              onChange={handleImageInput}
            />

            <FileImage className='size-8  rounded-full p-1 cursor-pointer' />
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
