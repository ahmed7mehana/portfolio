import Image from 'next/image';
import React from 'react';
import cryptoImg from '../public/assets/projects/crypto.jpg';
import { RiRadioButtonFill } from 'react-icons/ri';
import Link from 'next/link';

const crypto = () => {
  return (
    <div className='w-full'>
      <div className='w-screen h-[50vh] relative'>
        <div className='absolute top-0 left-0 w-full h-[50vh] bg-black/70 z-10' />
        <Image
          className='absolute z-1'
          layout='fill'
          objectFit='cover'
          src={cryptoImg}
          alt='/'
        />
        <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
          <h2 className='py-2'>Crypto App</h2>
          <h3>React JS / Tailwind / Firebase</h3>
        </div>
      </div>

      <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 py-8'>
        <div className='col-span-4'>
          <p>Project</p>
          <h2>Overview</h2>
          <p>
            I built this app to demonstrate knowledge working in React JS and
            accessing API endpoints. This app was built using React JS and is
            hosted on Firebase. This application supports user authentication
            using firebase. Users are able to create a new account using their
            email address and can then sign in to save coins to a user specific
            list. This is made possble by creating a firestore cloud storage
            database at the time of user registration. Another feature of this
            application is dynamic routing through the &quot;React Router DOM&quot;
            package. This application was built using the Coin Gecko API.
          </p>
          <a
            href="https://wa.me/+201558533755"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text[8px] font-bold uppercase">
              if u wanna buy it just get tech with me on whatsup
            </p>
            <button className="px-8 py-2 mt-4 mr-8 hover:bg-black hover:scale-1 ">
              Buy ( 5$ )
            </button>
          </a>

          <a
            href='https://dashboard-nextjs-3udyyxm3u-ahmed7mehana.vercel.app/'
            target='_blank'
            rel='noreferrer'
          >
            <button className='px-8 py-2 mt-4'>Demo</button>
          </a>

        </div>
        <div className='col-span-4 py-4 shadow-xl md:col-span-1 shadow-gray-400 rounded-xl'>
          <div className='p-2'>
            <p className='pb-2 font-bold text-center'>Technologies</p>
            <div className='grid grid-cols-3 md:grid-cols-1 '>
              <p className='flex items-center py-2 text-gray-600'>
                <RiRadioButtonFill className='pr-1' /> React
              </p>
              <p className='flex items-center py-2 text-gray-600'>
                <RiRadioButtonFill className='pr-1' /> Tailwind
              </p>
              <p className='flex items-center py-2 text-gray-600'>
                <RiRadioButtonFill className='pr-1' /> Javascript
              </p>
              <p className='flex items-center py-2 text-gray-600'>
                <RiRadioButtonFill className='pr-1' /> Firebase
              </p>
              <p className='flex items-center py-2 text-gray-600'>
                <RiRadioButtonFill className='pr-1' /> Coin Gecko API
              </p>
              <p className='flex items-center py-2 text-gray-600'>
                <RiRadioButtonFill className='pr-1' /> Routes
              </p>
            </div>
          </div>
        </div>
        <Link href='/#projects'>
          <p className='underline cursor-pointer'>Back</p>
        </Link>
      </div>
    </div>
  );
};

export default crypto;
