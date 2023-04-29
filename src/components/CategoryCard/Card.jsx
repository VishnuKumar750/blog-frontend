import Image from 'next/image'
import React from 'react'
import { FaComment, FaRegHeart } from 'react-icons/fa'

const Card = ({ item, onClick }) => {
  return (
   <div className='flex w-full px-4 py-4 my-2 cursor-pointer bg-white hover:scale-105 transition-all shadow-md'
   onClick={() => onClick(item.id)}
   >
     <div className='relative w-[20em] h-[12em] mx-2 group'>
        <div className='absolute z-[9] w-16 px-4 py-6 font-bold bg-black bg-opacity-80 top-0 left-0 text-white'>20 <br/> Dec</div>
        <Image 
           src="/post/hero.jpg"
           alt="posts"
           width={400}
           height={400}
           className='w-full h-full group-hover:scale-105 transition-all'
        />
     </div>
     <div className='mx-2'>
        <h1 className='text-[1rem] font-bold my-2'>Addiction When Gambling Becomes A Problem</h1>
        <p className='text-sm font-medium text-gray-400 my-4 max-w-xs h-14 overflow-hidden '>nappropriate behavior Lorem ipsum dolor sit amet, consectetur.</p>

        <div className='flex items-center justify-between mx-4 md:mx-0'>
           <div className='flex md:flex-row md:items-center md:justify-between'>
              <FaRegHeart />
              <p className='md:px-2 text-sm'>20000 Likes</p>
           </div>
           <div className='flex mx-2  md:flex-row md:items-center md:justify-between'>
              <FaComment />
              <p className='md:px-2 text-sm'>40000 Comments</p>
           </div>
        </div>
     </div>
   </div>
  )
}

export default Card