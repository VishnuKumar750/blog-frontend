import Image from 'next/image'
import React from 'react'
import { FaComment, FaRegHeart } from 'react-icons/fa'

const Card = ({ item }) => {

const date = new Date(item?.createdAt);
const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;

  return (
    <div className='flex w-full xs:px-1 sm:px-4 cursor-pointer my-4'
    >
      <div className='relative w-[20em] 4xl:h-[20em] h-[11em] mx-2 group flex-1'>
         <div className='absolute z-[9] w-16 px-4 py-6 font-bold bg-black bg-opacity-80 top-0 left-0 text-white'>{formattedDate}</div>
         <Image 
            src={item?.image || "/post/hero.jpg"}
            alt="posts"
            width={400}
            height={400}
            className='w-full h-full object-cover group-hover:scale-105 transition-all'
         />
      </div>
      <div className='mx-2 4xl:mx-8 flex-1'>
         <h1 className='text-xl font-bold 4xl:text-4xl my-2 xs:max-w-[8em] sm:max-w-[12em] truncate'>{item?.title}</h1>
         <p className='text-sm font-medium text-gray-400 my-4 max-w-xs h-14 4xl:text-xl 4xl:h-48 4xl:max-w-full overflow-hidden '>{item?.content}</p>

         <div className='flex items-center justify-between mx-1 md:mx-0 w-full'>
            <div className='flex md:flex-row items-center md:justify-between text-sm 4xl:text-2xl'>
               <FaRegHeart />
               <p className='px-1'>{item?.likes?.length > 0 && item?.likes?.length} Likes</p>
            </div>
            <div className='flex mx-2  md:flex-row items-center text-sm md:justify-between 4xl:text-2xl'>
               <FaComment />
               <p className=''>{item?.comments?.length > 0 && item?.comments?.length} Comments</p>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Card