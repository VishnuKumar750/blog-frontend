import React, {  useEffect, useState } from 'react'
import Card from './posts/Card'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import LoadingCard from './posts/LoadingCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '@/redux/Posts'
import Link from 'next/link'


const Posts = () => {
  const { loading, posts } = useSelector(state => state.post )
  const { totalPages } = useSelector(state => state.post.posts)
  const dispatch = useDispatch()
  const [ page, setPage ] = useState(1);
  
  useEffect(() => {
    dispatch(fetchPosts(page))
    }, [dispatch, page])

  const handlePrev = () => {
    if(page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if(page < totalPages) {
      setPage(prev => prev + 1)
    }
  }

  return (
   <div className='min-w-full md:px-8'>
   <div className='flex flex-col items-center justify-center mt-20 mb-20 px-8'>
     <h1 className='text-4xl font-bold mb-4 4xl:text-[5em] 4xl:my-14'>Posts</h1>
     <p className='text-[1.2rem] text-center leading-8 text-gray-700 font-medium font-serif  max-w-6xl 4xl:text-[3rem] 4xl:my-4 4xl:max-w-full 4xl:leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium at quaerat aliquid velit dolor fugiat ad voluptatibus iusto alias quis accusantium natus, cumque hic dolorem eveniet laboriosam soluta facilis ipsam.</p>
   </div>
   <div className='grid grid-cols-1 4xl:mx-14 lg:grid-cols-2 gap-6'>
    {loading ? (
      [...new Array(6)].map((_, i) => (
        <LoadingCard key={i} />
      ))
    ) :
     (posts?.data?.map((item, i) => (
      <Link key={i} href={ `/Post/${item._id}`}>
       <Card key={i} item={item} />
      </Link>  
     ))
     )}
   </div>
   <div className="flex items-center justify-center my-10">
        <div className={`mx-2 my-4 border-2 p-2 cursor-pointer ${page < 2 && 'hidden'}`} onClick={handlePrev} >
          <AiOutlineArrowLeft className='text-[1.2rem]'/>
        </div>
        <div className={`mx-2 border-2 p-2 cursor-pointer ${page === totalPages && 'hidden'}`} onClick={handleNext} >
        <AiOutlineArrowRight className='text-[1.2rem]'/>
        </div>
      </div>
  
 </div>
  )
}

export default Posts