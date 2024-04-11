import Blob from '@/components/Blob';
import { Switch } from '@/components/ui/switch';
import { UserButton } from '@clerk/nextjs';

const page = () => {
  return (
    <>
      <Blob />
      <div className='z-20 h-screen bg-gray-950/30 backdrop-blur-xl p-6 flex flex-col'>
        <UserButton afterSignOutUrl={'/'} />
        <div className='grow flex flex-col gap-y-6 mt-12'>
          <h1 className='text-2xl font-light text-center'>User Settings</h1>
          <div className=' rounded-lg border-white/10 flex flex-col items-start p-8 shadow-xl border w-full max-h-[25rem] h-full'>
            <div className='flex items-center justify-between w-full '>
              <label htmlFor='airplane-mode'>For Blind</label>
              <Switch
                id='airplane-mode'
                className=' data-[state=checked]:bg-gray-200 data-[state=unchecked]:bg-gray-950 border border-white/20'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
