import Image from 'next/image'
import React from 'react'

const Card = ({item, onClick}) => {
  const date = new Date(item?.createdAt);
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;


  return (
    <div className='grid grid-cols-5 cursor-pointer bg-white shadow-md py-2 my-2 w-full hover:scale-105 transition-all'
    onClick={onClick}
    >
      <div className='col-span-2 sm:col-span-1  md:col-span-2 h-[10em] relative'>
         <div className='absolute top-0 text-white bg-gray-900 z-[99] bg-opacity-80 px-4 py-4'>{formattedDate}</div>
         <Image 
            src={item?.image || "/user/user.jpg"}
            alt="posts"
            width={400}
            height={400}
            className='w-full h-full px-2 object-scale-up hover:scale-105 transition-all'
         />
      </div>
      <div className='px-4 col-span-3'>
         <h1 className='text-lg font-bold my-2 max-w-[15em] truncate'>{item?.title}</h1>
         <p className='text-sm font-medium text-gray-400 my-4 max-w-xs h-14 overflow-hidden '>{item?.content}</p>
         <p className='text-sm font-medium font-serif'>{item?.tags}</p>
      </div>
    </div>
  )
}

export default Card