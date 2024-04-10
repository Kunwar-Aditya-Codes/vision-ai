const Blob = () => {
  return (
    <div className=' flex items-center justify-center absolute left-0 right-0  top-0 bottom-0 -z-10 bg-gray-950'>
      <svg
        viewBox='0 0 500 500'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        width='100%'
        id='blobSvg'
        className='size-[30rem]'
      >
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' style={{ stopColor: 'rgb(148, 0, 255)' }}></stop>
            <stop
              offset='100%'
              style={{ stopColor: 'rgb(255, 32, 78)' }}
            ></stop>
          </linearGradient>
        </defs>
        <path fill='url(#gradient)'>
          <animate
            attributeName='d'
            dur={'10000ms'}
            repeatCount={'indefinite'}
            values='M423,303.5Q416,357,369.5,383.5Q323,410,272.5,428.5Q222,447,183.5,409Q145,371,101,339Q57,307,41,245.5Q25,184,77,147.5Q129,111,175.5,82Q222,53,287.5,39Q353,25,393.5,78.5Q434,132,432,191Q430,250,423,303.5Z;
        
        M425.5,306Q424,362,373.5,386.5Q323,411,269,451Q215,491,154,461Q93,431,63,372.5Q33,314,63.5,259Q94,204,100.5,144.5Q107,85,164,66.5Q221,48,280,51Q339,54,371,103Q403,152,415,201Q427,250,425.5,306Z;

        M428.5,310Q437,370,380,389.5Q323,409,270.5,440Q218,471,171.5,432.5Q125,394,78,354Q31,314,66,260Q101,206,97.5,138Q94,70,156.5,53.5Q219,37,281.5,40.5Q344,44,371.5,99Q399,154,409.5,202Q420,250,428.5,310Z;

        M433.5,317.5Q460,385,392.5,399Q325,413,273,430.5Q221,448,157,439.5Q93,431,60,373.5Q27,316,64,261Q101,206,120.5,164.5Q140,123,181,88.5Q222,54,274,69Q326,84,377.5,109.5Q429,135,418,192.5Q407,250,433.5,317.5Z;

        M470.5,313.5Q448,377,396,416Q344,455,280,472.5Q216,490,155.5,459.5Q95,429,55.5,374Q16,319,43.5,258.5Q71,198,94.5,147.5Q118,97,170.5,79.5Q223,62,283.5,53Q344,44,362,105Q380,166,436.5,208Q493,250,470.5,313.5Z;

        M423,303.5Q416,357,369.5,383.5Q323,410,272.5,428.5Q222,447,183.5,409Q145,371,101,339Q57,307,41,245.5Q25,184,77,147.5Q129,111,175.5,82Q222,53,287.5,39Q353,25,393.5,78.5Q434,132,432,191Q430,250,423,303.5Z;
        '
          ></animate>
        </path>
      </svg>
    </div>
  );
};
export default Blob;
