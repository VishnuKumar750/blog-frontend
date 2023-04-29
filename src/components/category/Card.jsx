import Image from 'next/image'
import React from 'react'

const Card = ({ item, onClick }) => {

   function hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    }

  return (

   <div className='flex w-full cursor-pointer' onClick={() => onClick(item.name)}>
     <div className='relative w-full   h-[14em] mx-2 group'>
      <div className={`absolute z-[9] w-36  px-4 py-6 font-bold top-0 left-0 text-center text-white`}
      style={{backgroundColor: `rgba(${hexToRgb(item.color)}, 0.7)`}}
      >{item.name}</div>
      <Image 
         src={item?.url}
         alt="posts"
         width={400}
         height={400}
         className='w-full h-full group-hover:scale-105 transition-all'
      />
   </div>
 </div>
  )
}

export default Card