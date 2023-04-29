import Image from 'next/image'
import React from 'react'
import { FaRegHeart, FaRegComment } from 'react-icons/fa'

const HeroSkeleton = () => {
  return (
    <div className="relative min-w-full h-screen md:h-[80vh] xl:h-[80vh] bg-gray-200 " >
        <div className='w-full h-full flex flex-col items-center justify-center  px-6 md:px-10'>
        <div className='my-10 w-full'>
          <h1 className='text-white text-center   md:text-left text-[2.5rem] md:text-[2rem] sm:w-[70%] 4xl:text-[5rem] 4xl:mx-20 bg-gray-500'></h1>
        </div>
        <div className='flex items-center  justify-between w-full '>
          <div className=' flex flex-col md:flex-row items-center text-white text-[1rem] my-4 4xl:text-[2rem] 4xl:mx-20'>
            <div className='flex items-center  my-2'>
            <h4 className='mx-4 bg-gray-200'>
              </h4>
            </div>
            <div className='flex items-center px-2'>
              <h4 className='mx-4 bg-gray-200'></h4>
            </div>
          </div>

          <div className='flex flex-col items-center md:flex-row md:mt-0'>
          <div className='w-[4em] h-[4em] 4xl:w-[5em] 4xl:h-[4em] hidden mx-4 md:block'>
            <div className='w-full h-full rounded-full bg-gray-200'></div>
          </div>
            <div className='my-2'>
          <h2 className='text-white text-[1.2rem] font-semibold 4xl:text-[2rem] 4xl:mx-20 bg-gray-200'></h2>
          <p className='text-white font-medium 4xl:text-[2rem] 4xl:mx-20 bg-gray-200'></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const Hero = () => {
  
  return ( 
    <>
    <div className="relative min-w-full h-screen md:h-[80vh] bg-center bg-no-repeat xl:h-[80vh] bg-opacity-50" style={{ background: `url(/logo/hero.jpg)`, backgroundSize: "cover", backgroundPosition: "center 80%"}}>
        <div className='w-full h-full flex flex-col items-center justify-center  px-6 md:px-10 '>
        <div className='my-10 w-full lg:ml-10'>
          <h1 className='text-slate-900 font-serif text-center text-2xl  md:text-left  md:text-[2rem] leading-[1.5em] sm:w-[70%] 4xl:text-[5rem] 4xl:mx-20'>{`"Intelligence is not just about knowledge, it's about having the wisdom to use it for the betterment of oneself and others."`}</h1>
        </div>
      </div>
    </div>
    </>
)}



export default Hero