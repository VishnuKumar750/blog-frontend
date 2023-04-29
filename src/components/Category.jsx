import React from 'react'
import Card from './category/Card'
import { useRouter } from 'next/router';
import { categories } from '../../data';
 
const Category = () => {
  const router = useRouter();
   
  const handleCategory = (categoryName) => {
    router.push(`/categories/${categoryName.toLowerCase()}`);
  }
   
  return (
   <div className='min-w-full px-4 md:px-8'>
   <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 4xl:mx-14 gap-6'>
     {categories?.map((item, i) => (  
       <Card key={i} item={item} onClick={handleCategory} />
     ))}
   </div>
 </div>
  )
}

export default Category