'use client';
import { RiNextjsFill } from 'react-icons/ri';
import { FaPython } from 'react-icons/fa6';
import { SiClerk } from 'react-icons/si';
import { FaDigitalOcean } from 'react-icons/fa6';

const ICONS = [
  { label: 'nextjs', icon: <RiNextjsFill className='size-12' /> },
  { label: 'python', icon: <FaPython className='size-11' /> },
  { label: 'clerk', icon: <SiClerk className='size-11' /> },
  { label: 'digitalocean', icon: <FaDigitalOcean className='size-11' /> },
];

const Icons = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center gap-12 mt-6 '>
      {ICONS.map((icon) => (
        <span>{icon.icon}</span>
      ))}
    </div>
  );
};

export default Icons;
