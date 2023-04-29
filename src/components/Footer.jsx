import Image from 'next/image'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='bg-black mt-10 h-full w-full px-4 lg:px-8 border-2'>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
         <div className='py-10 col-span-1 mx-8 lg:mx-0'>
            <h1 className='text-white text-xl my-2 font-bold'>Top Products</h1>
            <ul>
               <li className='text-white'>Product 1</li>
               <li className='text-white'>Product 2</li>
               <li className='text-white'>Product 3</li>
            </ul>
         </div>

         <div className='py-10 col-span-1 mx-8 lg:mx-0'>
            <h1 className='text-white my-2 text-xl font-bold'>News Letter</h1>
            <p className='text-white'>
               You can trust us. we only send promo offers, not a single spam.
            </p>
            <div className='flex flex-col lg:flex-row'>
            <input placeholder="Enter Email" className='w-full md:w-[50%] lg:w-[50%] outline-none text-gray-700 py-2 px-4 mt-2 rounded-full '/>
            <button className='text-white bg-sky-500 mt-4 px-12 md:w-[28%] py-2 w-56 rounded-full lg:w-32 font-semibold flex items-center lg:px-4 lg:mx-2 '>Subscribe
            <FaArrowRight className='font-normal mx-2'/>
            </button>
            </div>
         </div>

         <div className='py-10 col-span-1 mx-8 lg:mx-0'>
            <h1 className='text-white w-full font-bold'>Instagram Feed</h1>
            <div className='grid grid-cols-4 w-[14em] my-2 py-2 gap-6 px-2'>
               {[...Array(8)].map((item, index ) => (
                  <div key={index} className='w-[3em] h-[3em] border-2 border-yellow-300'>
                     <Image
                        src="/post/hero.jpg"
                        alt="posts"
                        width={400}
                        height={400}
                        className='w-full h-full'
                     />
                  </div>
               ))}
            </div>

         </div>
      </div>
    </div>
  )
}

export default Footer