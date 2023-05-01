import React from 'react'

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