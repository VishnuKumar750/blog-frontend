import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillLike } from 'react-icons/ai'
import { FaTwitter } from 'react-icons/fa'

const UserDetails = ({ author }) => {
  return (
    <div className='my-8 flex flex-col items-center justify-center border-2 bg-white shadow-md border-gray-200 mx-4 py-8'>
      <div className='h-[8em] w-[8em]'>
      <Link href={`/Account/${author?._id}`}>
         <Image 
             src={author?.avatar || '/categories/technology.jpg'}
             alt="posts"
               width={400}
               height={400}
               className='w-full h-full rounded-full'
         />
         </Link>
      </div>
      <div className='my-2'>
         <h1 className='text-center text-lg font-bold my-2'>{author?.name}</h1>
         <p className='mx-8 text-center my-4 text-gray-400 '>{author?.bio ? author?.bio : "MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money"}</p>

         <div className='flex items-center justify-center my-4'>
            <div className='border-2 flex  items-center mx-4 py-2 px-2 cursor-pointer'>
               <AiFillLike />
               <p className='mx-4'>Like</p>
            </div>
            <div className='border-2 flex  items-center py-2 px-2 cursor-pointer'>
               <FaTwitter />
               <p className='mx-4'>Follow</p>
            </div>
         </div>
      </div>
    </div>
  )
}

export default UserDetails