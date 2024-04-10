import Footer from '@/components/Footer';
import { SignUp } from '@clerk/nextjs';

const page = () => {
  return (
    <div className='h-screen flex flex-col'>
      <div className='flex-grow flex items-center justify-center'>
        <SignUp afterSignUpUrl={'/capture'} />
      </div>
      <Footer />
    </div>
  );
};
export default page;
