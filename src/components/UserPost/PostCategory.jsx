import React from 'react'
import { categories } from '../../../data'
import { useRouter } from 'next/router'

const PostCategory = () => {
  const router = useRouter()
  const handleRoute = (categoryName) => {
    router.push(`/categories/${categoryName}`)
  }


  return (
    <div className='my-4 px-4'>
      <h1 className='text-2xl font-bold '>Post Category</h1>

      <div className='my-4'>
         {categories?.map((item, i) => (
            <div key={i} className='hover:bg-black hover:text-white py-2 px-4 cursor-pointer my-2 font-semibold text-gray-700' onClick={() => handleRoute(item.name)}>
               {item.name}
         </div>
         ))}

      </div>
    </div>
  )
}

export default PostCategory