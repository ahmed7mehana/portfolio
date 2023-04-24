import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import propertyImg from '../public/assets/projects/property.jpg';
import cryptoImg from '../public/assets/projects/crypto.jpg'
import netflixImg from '../public/assets/projects/netflix.jpg'
import twitchImg from '../public/assets/projects/twitch.jpg'
import DreamCart from '../public/assets/Dream-cart.png'
import Candle from '../public/assets/Candle.png'
import ProjectItem from './ProjectItem';

const Projects = () => {
  return (
    <div id='projects' className='w-full '>
      <div className='max-w-[1240px] mx-auto px-2duration-500 py-16'>
        <p className='text-xl tracking-widest uppercase  text-[#5651e5]'>
          Projects
        </p>
        <h2 className='py-4'>What I&apos;ve Built</h2>
        <div className='grid md:grid-cols-2 gap-8 '>
          <ProjectItem
            title='Dream-Cart'
            backgroundImg={DreamCart}
            projectUrl='/property'
            tech='Next.js'
          />

          <ProjectItem
            title='Candle'
            backgroundImg={Candle}
            projectUrl='/Candle'
            tech='Next.js'
          />

          <ProjectItem
          title='crypto'
          backgroundImg={cryptoImg}
          projectUrl='/crypto'
          tech='React'
        />

        </div>
      </div>
    </div>
  );
};

export default Projects;
