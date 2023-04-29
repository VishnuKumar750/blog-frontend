import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <section className='px-2 lg:px-8 my-10'>
      <div className='flex flex-col items-center justify-center mt-20 mb-10 px-8'>
     <h1 className='text-4xl font-bold mb-4 4xl:text-[5em] 4xl:my-14'>About</h1>
     <p className='text-[1.2rem] text-center leading-8 text-gray-700 font-medium font-serif  max-w-6xl 4xl:text-[3rem] 4xl:my-4 4xl:max-w-full 4xl:leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium at quaerat aliquid velit dolor fugiat ad voluptatibus iusto alias quis accusantium natus, cumque hic dolorem eveniet laboriosam soluta facilis ipsam.</p>
   </div>
   
   <div className='w-full flex items-center justify-center'>
   <div className='flex flex-col w-[80%]  lg:flex-row  items-center lg:items-start justify-between '>
      <div className='flex-1'>
         <p className='text-[1.4rem] text-gray-700 font-serif text-center'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe doloribus quis sint illum, repudiandae eum expedita nobis, officia esse laudantium corporis commodi fugit doloremque facere quod, impedit accusantium quasi. Voluptates repudiandae, amet exercitationem pariatur, ad aperiam in necessitatibus sit consequuntur nulla iure, culpa ea.
         </p>
      </div>
      <div className='flex-1 my-10 lg:mx-10 lg:my-0 w-[14em] h-[14em] lg:h-[20em]'>
         <Image src="/user/user.jpg" alt="user" width={100} height={100} className='w-full h-full object-contain' />
      </div>
   </div>
   </div>
   </section>
  )
}

export default About