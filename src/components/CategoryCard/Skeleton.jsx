import React from 'react'
import { FaComment, FaRegHeart } from 'react-icons/fa'

const Skeleton = () => {
  return (
   <div className='flex w-full px-4 py-4 cursor-pointer animate-pulse'>
   <div className='relative w-[20em] h-[12em] mx-2 group bg-gray-300'>
     <div className='absolute z-[9] w-16 px-4 py-6 font-bold bg-black bg-opacity-0 top-0 left-0 text-white'></div>
   </div>
   <div className='mx-2'>
     <h1 className='text-[1rem] font-bold my-2 bg-gray-300 h-5 rounded'></h1>
     <p className='text-sm font-medium text-gray-400 my-4 max-w-xs h-7 overflow-hidden bg-gray-300 rounded'></p>
 
     <div className='flex items-center justify-between mx-4 md:mx-0'>
       <div className='flex md:flex-row md:items-center md:justify-between'>
         <FaRegHeart className='text-gray-300' />
         <p className='md:px-2 text-sm bg-gray-300 h-5 rounded'></p>
       </div>
       <div className='flex mx-2  md:flex-row md:items-center md:justify-between'>
         <FaComment className='text-gray-300' />
         <p className='md:px-2 text-sm bg-gray-300 h-5 rounded'></p>
       </div>
     </div>
   </div>
 </div>
  )
}

export default Skeleton