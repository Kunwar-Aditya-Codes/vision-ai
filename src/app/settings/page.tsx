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
      <div className='z-20 max-w-5xl mx-auto  h-screen bg-gray-950/30 backdrop-blur-xl p-6 flex flex-col'>
        <div className='flex items-center justify-between'>
          <Link
            href={'/chat'}
            className='flex items-center text-sm  text-zinc-300 '
          >
            <ArrowLeft className='size-5' />
          </Link>
          <UserButton afterSignOutUrl={'/'} />
        </div>
        <div className='grow md:justify-center flex flex-col gap-y-6 mt-20'>
          <h1 className='text-2xl font-light text-center'>User Settings</h1>
          <div className='max-w-lg mx-auto md:bg-white/5 rounded-lg border-white/10 flex flex-col gap-y-8 items-start p-8 shadow-xl border w-full  h-auto'>
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

            <div className='grid grid-cols-1 gap-y-3 w-full'>
              <Button className='w-full bg-transparent border border-white/25  hover:bg-white/5'>
                Upgrade to Pro
              </Button>

              <Button asChild>
                <Link
                  className='w-full bg-transparent border border-white/25  hover:bg-white/5'
                  href={'https://forms.gle/hveMuCfFeTmRuBM99'}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Share your feedback
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Settings;
