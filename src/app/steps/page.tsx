import Blob from '@/components/Blob';
import WorkingSteps from '@/components/WorkingSteps';

const Steps = () => {
  return (
    <>
      <Blob />
      <div className='z-20 max-w-5xl mx-auto  min-h-screen bg-gray-950/30 backdrop-blur-xl p-6 '>
        <h1 className='text-center text-4xl font-bold  text-zinc-200 mt-12 '>
          How the app works?
        </h1>

        <WorkingSteps />
      </div>
    </>
  );
};
export default Steps;
