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

const ProfileCard = () => {
  return (
    <>
      {TEAM.map((member) => (
        <div
          key={member.id}
          className='scale-90 md:scale-100 group relative h-[20rem] w-[17rem] bg-white/25 p-1 rounded-xl overflow-hidden'
        >
          <img
            className='rounded-xl object-cover'
            alt='profile'
            src={member.sourceImage}
          />

          <div className='transition-transform duration-300 absolute bg-black/50  top-0 left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0'>
            <div className='h-full w-full backdrop-blur-sm flex flex-col  p-6'>
              <h1 className=' text-2xl font-medium'>{member.name}</h1>

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
    </>
  );
};
export default ProfileCard;
