'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const TEAM = [
  {
    id: 1,
    name: 'Kunwar Aditya',
    description: ['Frontend', 'Pipeline Integration', 'Deployment'],
    sourceImage: '/new.png',
  },
  {
    id: 2,
    name: 'Niharika Rindhe',
    description: ['Backend', 'NLP'],
    sourceImage: '/niharika.jpeg',
  },
  {
    id: 3,
    name: 'Yash Badgujar',
    description: ['Backend', 'Deployment'],
    sourceImage: '/yash.jpeg',
  },
];

const DevProfile = () => {
  return (
    <div className='flex flex-col lg:flex-row lg:gap-36 items-center p-8 gap-20'>
      {TEAM.map((member) => (
        <div
          key={member.name}
          className='flex flex-col items-start border border-zinc-600 backdrop-blur-lg h-[30rem] p-6 rounded-xl'
        >
          <Image
            src={member.sourceImage}
            alt={member.name}
            height={500}
            width={500}
            className=' object-cover size-[15rem] object-center rounded-xl'
          />
          <div className='mt-4 text-center flex flex-col  items-center space-y-3'>
            <p className='text-xl w-full text-start  '>{member.name}</p>
            <div className='flex flex-col '>
              {member.description.map((contribution) => (
                <span
                  key={contribution}
                  className='flex text-zinc-200 items-center w-[15rem] font-medium py-2 text-start'
                >
                  <ArrowRight className='size-5 mr-2' />
                  {contribution}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DevProfile;
