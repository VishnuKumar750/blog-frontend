import { FaComment, FaRegHeart } from "react-icons/fa";

const LoadingCard = () => {
   return (
     <div className='flex w-full px-4 h-[10em] cursor-pointer animate-pulse'>
       <div className='relative w-[20em] h-full mx-2 group'>
         <div className='absolute z-[9] w-16 px-4 py-6 font-bold bg-gray-400 bg-opacity-80 top-0 left-0 text-white'></div>
         <div className='w-full h-full bg-gray-400 rounded-lg'></div>
       </div>
       <div className='mx-2 w-full'>
         <h1 className='text-lg font-bold my-2 bg-gray-400 rounded'></h1>
         <p className='text-sm font-medium text-gray-400 my-4 max-w-xs h-14 overflow-hidden bg-gray-400 rounded'></p>
         <div className='flex items-center justify-between mx-1 md:mx-0 w-full'>
           <div className='flex md:flex-row items-center md:justify-between text-sm'>
             <p className='px-1 bg-gray-400 rounded'></p>
           </div>
           <div className='flex mx-2 md:flex-row items-center text-sm md:justify-between'>
             <p className='bg-gray-400 rounded'></p>
           </div>
         </div>
       </div>
     </div>
   )
 }

 export default LoadingCard;