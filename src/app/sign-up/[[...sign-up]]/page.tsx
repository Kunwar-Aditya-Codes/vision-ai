import { SignUp } from '@clerk/nextjs';

const page = () => {
  return (
    <div className='h-screen flex flex-col'>
      <div className='flex-grow flex items-center justify-center'>
        <SignUp afterSignUpUrl={'/capture'} />
      </div>
    </div>
  );
};
export default page;
