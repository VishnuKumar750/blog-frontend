import Image from 'next/image'
import React from 'react'

const Card = ({ item, onClick }) => {
const date_string = "2023-04-26T12:51:07.941Z";
const dt_object = new Date(date_string);
const formatted_date = dt_object.toLocaleDateString("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});


  return (
    <div className='my-4 mx-2 cursor-pointer' 
    onClick={() => onClick(item._id)}
    >
      <div className='relative group overflow-hidden'>
      <Image src={item?.image || "/post/hero.jpg"} alt="trending" width={1080} height={1080} className='w-full h-[14em]  transition-all group-hover:scale-125 4xl:h-[30em] object-cover'/>
      <div className='absolute top-0 w-full h-full z-[99] bg-gray-300 bg-opacity-40 group-hover:bg-opacity-0 transition-all'></div>
      </div>
      <div>
         <div className='my-2 py-2 w-32 bg-gray-900 px-2 bg-opacity-90 4xl:w-52 '>
            <h5 className='text-white text-[1rem] font-bold 4xl:text-[2rem]'>{formatted_date}</h5>
         </div>
         <h1 className='text-md font-bold overflow-hidden truncate max-w-xl mt-4 4xl:text-[2.5rem] text-gray-900 4xl:max-w-7xl 4xl:leading-tight'>{item?.title}</h1>
      </div>
    </div>
  )
}

export default Card