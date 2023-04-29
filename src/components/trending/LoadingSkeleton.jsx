import React from 'react'

const LoadingSkeleton = () => {
  return (
   <div className='my-4 mx-2 cursor-pointer' 
   >
     <div className='relative group overflow-hidden '>
      <div className='w-full h-[14em] bg-gray-200'></div>
      <div className='absolute top-0 w-full h-full z-[99] bg-gray-300 bg-opacity-40 group-hover:bg-opacity-0 transition-all'></div>
     </div>
     <div>
        <div className='my-2 py-2 w-32 bg-gray-900 px-2 bg-opacity-90 4xl:w-52 '>
           <h5 className='text-white text-[1rem] font-bold 4xl:text-[2rem] bg-gray-200'></h5>
        </div>
        <h1 className='text-md font-bold overflow-hidden truncate max-w-xl mt-4 4xl:text-[2.5rem] text-gray-900 4xl:max-w-7xl 4xl:leading-tight bg-gray-200'></h1>
     </div>
   </div>
  )
}

export default LoadingSkeleton