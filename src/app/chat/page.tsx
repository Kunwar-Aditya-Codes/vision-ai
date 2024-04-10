import Camera from '@/components/Camera';
import { Settings } from 'lucide-react';
import Link from 'next/link';

const Chat = () => {
  return (
    <div className=''>
      {/* <div className='flex items-center justify-end p-4'>
        <Link href={'/settings'}>
          <Settings className='size-5' />
        </Link>
      </div> */}
      <div className='h-screen'>
        <Camera />
      </div>
    </div>
  );
};
export default Chat;
