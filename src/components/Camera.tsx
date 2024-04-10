'use client';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Circle, RotateCcw, Send, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Camera = () => {
  const webcamRef = useRef<Webcam>(null);
  const [capture, setCapture] = useState<string>();

  const captureImage = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot() as string;
      setCapture(imageSrc);
    }
  }, [webcamRef]);

  return (
    <div className='h-full relative'>
      <button className='absolute top-4 flex items-center justify-center  right-4 bg-gray-950 w-fit mx-auto rounded-full p-1.5'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings className='size-5' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-4 mt-2 bg-gray-950 border-none w-[10rem] text-white'>
            {/* TODO: add switch */}
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </button>
      {capture ? (
        <div className='h-full object-cover'>
          <img src={capture} alt='' className='h-[80%] object-cover' />
          <div className=' mt-4 flex items-center px-2 gap-x-2'>
            <input
              className='w-full p-2 rounded-lg text-sm bg-transparent border'
              placeholder='Ask about image... '
            />
            <Send className='size-9 rounded-lg border p-2 cursor-pointer bg-white/5' />
          </div>
        </div>
      ) : null}

      {!capture ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            className='w-full h-full object-cover'
            videoConstraints={
              {
                facingMode: {
                  exact: 'environment',
                }, // 'user' for front camera, 'environment' for back camera
              }
            }
          />
          <button
            onClick={captureImage}
            className='absolute bottom-5 flex items-center justify-center left-0 right-0 border-2 w-fit mx-auto rounded-full p-1'
          >
            <Circle className='size-12 bg-white rounded-full' />
          </button>
        </>
      ) : null}
    </div>
  );
};
export default Camera;
