import Blob from '@/components/Blob';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import { FaShieldAlt } from 'react-icons/fa';
import { MdViewCompact } from 'react-icons/md';
import {
  SiTailwindcss,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiStripe,
} from 'react-icons/si';
import ProfileCard from '@/components/ProfileCard';

const TECH = [
  {
    id: 1,
    icon: <SiReact className='size-8' />,
    title: 'React',
    description:
      'A JavaScript library for building user interfaces, maintained by Facebook.',
  },
  {
    id: 2,
    icon: <SiNextdotjs className='size-8' />,
    title: 'Next.js',
    description:
      'A React framework that enables functionality like server-side rendering and generating static websites for React based web applications.',
  },
  {
    id: 3,
    icon: <SiTailwindcss className='size-8' />,
    title: 'Tailwind CSS',
    description:
      'A utility-first CSS framework for creating custom designs quickly.',
  },
  {
    id: 4,
    icon: <FaShieldAlt className='size-6' />,
    title: 'Clerk',
    description:
      'A developer-first authentication and user management service.',
  },
  {
    id: 5,
    icon: <MdViewCompact className='size-8' />,
    title: 'Shadcn-ui',
    description:
      'It seems there might be a typo or an unknown technology. Could you provide more information?',
  },
  {
    id: 6,
    icon: <SiStripe className='size-8' />,
    title: 'Stripe',
    description: 'A payment processing platform for online businesses.',
  },
  {
    id: 7,
    icon: <SiPython className='size-8' />,
    title: 'Python',
    description:
      'A high-level, interpreted programming language known for its simplicity and readability.',
  },
  {
    id: 8,
    icon: <SiPython className='size-8' />,
    title: 'Ollama',
    description:
      'It seems there might be a typo or an unknown technology. Could you provide more information?',
  },
];

const TEAM = [
  {
    id: 1,
    name: 'Kunwar Aditya',
    description: '',
    sourceImage: '/new.png',
  },
  {
    id: 2,
    name: 'Niharika Rindhe',
    description: '',
    sourceImage: '/niharika.jpeg',
  },
  {
    id: 3,
    name: 'Yash Badgujar',
    description: '',
    sourceImage: '/yash.jpeg',
  },
];

export default function Home() {
  const { userId } = auth();

  return (
    <>
      <Blob />
      <div className=' overflow-x-hidden min-h-screen  bg-gray-950/30 backdrop-blur-xl flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center h-screen '>
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

        {/* Tech */}
        <div className='max-w-6xl pb-8 mx-auto '>
          <h1 className='text-center text-4xl font-bold text-zinc-200'>
            Technologies
          </h1>

          <div className='mt-10 grid sm:grid-cols-2 md:grid-cols-3 justify-items-center lg:grid-cols-4 gap-4'>
            {TECH.map((tech) => (
              <div key={tech.id} className='  p-4 rounded-lg '>
                <div className='flex items-center space-x-2'>
                  <span>{tech.icon}</span>
                  <span>{tech.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Developers */}
        <div className='max-w-6xl mt-28 mb-16 pb-8 mx-auto'>
          <h1 className='text-center text-4xl font-bold text-zinc-200'>
            The Team
          </h1>

          <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4'>
            {TEAM.map((member) => (
              <ProfileCard
                key={member.id}
                name={member.name}
                source={member.sourceImage}
                description={member.description}
              />
            ))}
          </div>
        </div>
        <footer className='flex items-center justify-center w-full h-12 bg-white/5'>
          <p className='text-sm text-zinc-200'>
            &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
