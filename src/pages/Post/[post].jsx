import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Comments from '@/components/UserPost/Comments'
import PostCategory from '@/components/UserPost/PostCategory'
import PostDetails from '@/components/UserPost/PostDetails'
import UserDetails from '@/components/UserPost/UserDetails'
import { fetchUserPostFailure, fetchUserPostStart, fetchUserPostSuccess } from '@/redux/Posts'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'


const Post = () => {
  const router = useRouter();
  const {  user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [ commPush, setCommPush ] = useState(false);
  const [ updateEffect, setUpdateEffect ] = useState(false);
  
  const { loading, posts } = useSelector(state => state.sp )

  const handleCommData = () => {
    setCommPush(!commPush);
  }

  const handleUpdateEffect = () => {
    console.log('update effect');
    setUpdateEffect(!updateEffect);
  }

  useEffect(() => {
    if(!router.query.post) {
      return;
    }
      const fetchSinglePost = async () => {
        dispatch(fetchUserPostStart())
        try {
          const res = await axios.get(`http://localhost:5000/api/posts/getPost/${router.query.post}`, {
            headers: {
              'Content-Type': 'application/json',
              'cache-control': 'no-cache'
            }
          })

          if(res.data) {
            dispatch(fetchUserPostSuccess(res.data.data))
          } else {
            dispatch(dispatch(fetchUserPostFailure(res.data.message)))
          }
        } catch(err) {
          console.log(err);
        }
      }
      fetchSinglePost();
  },[router.query.post, dispatch, commPush, updateEffect])
  
  return (
    <>
    <Head>
      <title>Posts</title>
      <meta name="description" content="Posts" />
    </Head>
    <Navbar />
      <div className='w-full h-[50vh] bg-sky-400 flex flex-col items-start  justify-center lg:px-8'>
        <h1 className='text-[2.5rem] text-white font-bold mx-4'>Post Details</h1>
        <ul className='mx-4 flex items-center justify-around my-4 text-[1.2rem] text-white'>
          <li className='cursor-pointer'>Home</li>
          <AiOutlineArrowRight className='mx-2'/>
          <li className='mx-2 cursor-pointer'>Category</li>
          <AiOutlineArrowRight className='mx-2'/>
          <li className='cursor-pointer'>Fashion</li>
        </ul>
      </div>
    <div className='grid grid-cols-1 lg:grid-cols-5 relative'>
      <div className='lg:col-span-3'>
      <div className=''>
        <PostDetails posts={posts} handleUpdateEffect={handleUpdateEffect} />
      </div>

      <div className='border-b-2 border-gray-200 my-4 lg:px-8'>
        <h1 className='text-[1.5rem] text-gray-700 font-bold mx-4 my-8'>Comments</h1>
        <Comments handleCommData={handleCommData} comments={posts?.post}/>
      </div>
      </div>
      {/* details */}
      <div className='lg:col-span-2 lg:px-8'>
        <div>
          <UserDetails author={posts?.author}/>
        </div>
        <div>
          <PostCategory  />
        </div>
      </div>
    </div>

    <Footer />
    </>
  )
}

export default Post