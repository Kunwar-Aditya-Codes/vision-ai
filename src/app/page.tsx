import Blob from '@/components/Blob';
import DevProfile from '@/components/home-ui/DevProfile';
import Icons from '@/components/home-ui/Icons';
import { auth } from '@clerk/nextjs';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { userId } = auth();

  return (
    <>
      <Blob />
      <div className=' overflow-x-hidden relative min-h-screen bg-gray-950/30 backdrop-blur-xl flex flex-col items-center justify-center'>
        {userId ? (
          <Link
            href={'/settings'}
            className='absolute z-10 top-4 md:top-8 md:right-12 flex items-center justify-center  right-4 bg-gray-950 w-fit mx-auto rounded-full p-1.5'
          >
            <Settings className='size-6' />
          </Link>
        ) : null}
        <div className='flex flex-col items-center justify-center h-screen '>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-6xl sm:text-[6rem] font-bold text-white text-center'>
              Vision AI
            </h1>
            <p className='text-xl font-medium text-zinc-100 text-center'>
              Vision to help
            </p>
          </div>

          <Link href={userId ? '/chat' : '/sign-in'}>
            <button className='mt-16  bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px   leading-6   text-white inline-block'>
              <span className='absolute inset-0 overflow-hidden rounded-full '>
                <span className='absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,126,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-100 '></span>
              </span>
              <div className='relative flex space-x-2 items-center z-10 rounded-full sm:text-xl  sm:h-[3rem] bg-zinc-950 py-1 px-8 ring-1 ring-white/10 '>
                <span>{userId ? 'Chat' : 'Login'}</span>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M10.75 8.75L14.25 12L10.75 15.25'
                  ></path>
                </svg>
              </div>
              <span className='absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40'></span>
            </button>
          </Link>
        </div>

        {/* Tech */}
        <div className='max-w-6xl pb-8 mx-auto '>
          <h1 className='text-center text-4xl font-bold  text-zinc-200 '>
            Technologies
          </h1>

          {/* <div className='px-4 mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 justify-items-center sm:justify-items-start gap-8'>
            {TECH.map((tech) => (
              <div
                key={tech.id}
                className='underline underline-offset-2 text-lg'
              >
                <span>{tech.title}</span>
              </div>
            ))}
          </div> */}

          <Icons />
        </div>

        {/* Developers */}
        <div className='max-w-6xl mt-28 mb-16 pb-8 mx-auto'>
          <h1 className='text-center text-4xl font-bold text-zinc-200'>
            The Team
          </h1>

          <DevProfile />

          {/* <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4'>
            {TEAM.map((member) => (
              <ProfileCard
                key={member.id}
                name={member.name}
                source={member.sourceImage}
                description={member.description}
              />
            ))}
          </div> */}
        </div>

        {/*  */}

        <footer className='flex items-center justify-center w-full h-12 bg-white/5'>
          <p className='text-sm text-zinc-200'>
            &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
