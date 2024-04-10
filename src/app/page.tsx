import Blob from '@/components/Blob';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { userId } = auth();

  return (
    <>
      <Blob />
      <main className='z-20 h-screen bg-gray-950/30 backdrop-blur-xl flex items-center justify-center'>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-6xl sm:text-[6rem] font-bold text-white text-center'>
              Vision AI
            </h1>
            <p className='text-xl font-medium text-zinc-100 text-center'>
              Vision to help
            </p>
          </div>

          <Button
            className='mt-16 rounded-full  sm:text-xl  sm:h-[3.5rem]  px-12 font-light bg-gray-950 hover:bg-gray-900'
            size={'lg'}
            asChild
          >
            {userId ? (
              <Link href={'/chat'}>
                Chat <ArrowRight className='ml-1 size-5' />
              </Link>
            ) : (
              <Link href={'/sign-in'}>
                Login <ArrowRight className='ml-1 size-5' />
              </Link>
            )}
          </Button>
        </div>
      </main>
    </>
  );
}
