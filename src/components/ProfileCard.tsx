import Image from 'next/image';

const ProfileCard = () => {
  return (
    <div className='scale-90 md:scale-100 group relative h-[20rem] w-[17rem] bg-white/25 p-1 rounded-xl overflow-hidden'>
      <Image
        className='rounded-xl object-cover'
        alt='profile'
        src={'/new.png'}
        width={500}
        height={500}
      />

      <div className='transition-transform duration-300 absolute bg-black/50  top-0 left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0'>
        <div className='h-full w-full backdrop-blur-sm flex flex-col  p-6'>
          <h1 className=' text-2xl font-medium'>Kunwar Aditya</h1>
          <p className=' mt-4 text-zinc-200'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum,
            aliquam.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
