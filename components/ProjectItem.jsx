import Link from 'next/link'
import React from 'react'

const ProjectItem = ({title, backgroundImg, tech, projectUrl}) => {
  return (
    <div className='relative flex items-center justify-center h-[208px] w-[300px]  shadow-xl shadow-gray-400 rounded-xl group hover:bg-gradient-to-r from-[#5651e5] to-[#709dff] '>
    <img className=' w-full h-[full] rounded-xl group-hover:opacity-10'  src={backgroundImg} alt='/' /> 
    <div className='hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <h3 className='text-[18px] tracking-wider text-center text-white uppercase'>{title}</h3>
        <p className='pt-2 pb-4 text-center text-white lowercase'>{tech}</p>
        <Link href={projectUrl}>
            <p className='py-1 text-[15px] font-bold text-center text-gray-700 bg-white rounded-lg cursor-pointer'>Details</p>
        </Link>
    </div>
 </div>
  )
}

export default ProjectItem