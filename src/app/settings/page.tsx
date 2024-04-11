'use client';

import Blob from '@/components/Blob';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import useBoundStore from '@/store/store';
import { UserButton } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const Settings = () => {
  const { isBlind, setBlind } = useBoundStore((state) => state);

  return (
    <>
      <Blob />
      <div className='z-20 h-screen bg-gray-950/30 backdrop-blur-xl p-6 flex flex-col'>
        <UserButton afterSignOutUrl={'/'} />
        <div className='grow flex flex-col gap-y-6 mt-20'>
          <h1 className='text-2xl font-light text-center'>User Settings</h1>
          <div className=' rounded-lg border-white/10 flex flex-col gap-y-8 items-start p-8 shadow-xl border w-full  h-auto'>
            <div className='flex items-center justify-between w-full'>
              <label htmlFor='airplane-mode' className='text-lg font-medium'>
                For Blind
              </label>
              <Switch
                checked={isBlind}
                onCheckedChange={() => setBlind()}
                id='airplane-mode'
                className=' data-[state=checked]:bg-gray-200 data-[state=unchecked]:bg-gray-950 border border-white/20'
              />
            </div>
            <div className='flex items-center justify-between w-full text-lg font-medium'>
              <label htmlFor='plan-type'>Current Plan</label>
              <p id='plan-type'>Basic</p>
            </div>

            <Button className='w-full bg-transparent border border-white/25  hover:bg-white/5'>
              Upgrade to Pro
            </Button>
          </div>
          <Link
            href={'/chat'}
            className='flex items-center space-x-1 underline underline-offset-2'
          >
            <ArrowLeft className='size-4' />
            <span>Back to chat</span>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Settings;
