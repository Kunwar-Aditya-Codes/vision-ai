import Blob from '@/components/Blob';
import WorkingSteps from '@/components/WorkingSteps';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';

const Steps = () => {
  const { userId } = auth();

  return (
    <>
      <Blob />
      <div className='z-20 max-w-6xl mx-auto  min-h-screen bg-gray-950/30 backdrop-blur-xl p-6 '>
        <h1 className='text-center text-4xl font-bold  text-zinc-200 mt-12 '>
          How the app works?
        </h1>

        <WorkingSteps />

        <div className='flex items-center justify-center py-6 mt-12  '>
          <button className='w-[15rem] bg-white/5 py-4 font-medium  rounded-full border border-zinc-800 text-lg'>
            {userId ? (
              <Link href={'/chat'}>Start exploring</Link>
            ) : (
              <Link href={'/sign-in'}>Login</Link>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
export default Steps;
