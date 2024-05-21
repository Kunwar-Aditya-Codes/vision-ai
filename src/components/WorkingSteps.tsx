const WORKING_STEPS = [
  {
    title: 'Step 1',
    img: '/step-1.jpeg',
    description: 'Click on the Sign In button.',
  },
  {
    title: 'Step 2',
    img: '/step-2.jpeg',
    description: 'Sign In through your google account.',
  },
  {
    title: 'Step 3',
    img: '/step-3.jpeg',
    description:
      'The camera will ask for permission. After that you can capture the image through center button.',
  },
  {
    title: 'Step 4',
    img: '/step-3.jpeg',
    description:
      'The leftmost button is to flip the camera. The rightmost button is to import image from gallery.',
  },
  {
    title: 'Step 5',
    img: '/step-5.jpeg',
    description:
      'After capturing the image a text box will be shown below in which you can ask questions regarding the image.',
  },
  {
    title: 'Step 6',
    img: '/step-6.jpeg',
    description:
      'The processing time is approximately 2 mins, after which the response will stream in and can be read.',
  },
];

const WorkingSteps = () => {
  return (
    <div className='p-4 mt-16 grid justify-items-center md:justify-items-stretch grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-auto gap-6 lg:gap-10 xl:gap-16'>
      {WORKING_STEPS.map((step) => (
        <div
          key={step.title}
          className='border w-[20rem] flex flex-col space-y-6 items-center rounded-xl p-8 border-zinc-400 backdrop-blur-lg bg-white/5'
        >
          <span className='text-2xl font-bold'>{step.title}</span>
          <img src={step.img} alt='step image' className='w-[50%] ' />
          <span className='font-medium text-justify'>{step.description}</span>
        </div>
      ))}
    </div>
  );
};
export default WorkingSteps;
