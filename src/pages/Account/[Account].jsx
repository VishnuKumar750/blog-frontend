import Card from '@/components/Account/Card'
import AccountProfile from '@/components/Account/AccountProfile'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { fetchUserAllPostFailure, fetchUserAllPostStart, fetchUserAllPostSuccess } from '@/redux/Posts'
import {  getLoggedUser } from '@/redux/Auth'
import Cookies from 'js-cookie'

const items = [
   {
      id: 1,
      title: 'Addiction When Gambling Becomes A Problem',
      date: '20 Dec',
      image: '/post/hero.jpg',
      likes: 20000,
      comments: 40000,
      description: 'nappropriate behavior Lorem ipsum dolor sit amet, consectetur.'
   },
   {
      id: 2,
      title: 'Addiction When Gambling Becomes A Problem',
      date: '20 Dec',
      image: '/post/hero.jpg',
      likes: 20000,
      comments: 40000,
      description: 'nappropriate behavior Lorem ipsum dolor sit amet, consectetur.'
   },
   {
      id: 3,
      title: 'Addiction When Gambling Becomes A Problem',
      date: '20 Dec',
      image: '/post/hero.jpg',
      likes: 20000,
      comments: 40000,
      description: 'nappropriate behavior Lorem ipsum dolor sit amet, consectetur.'
   },
   {
      id: 4,
      title: 'Addiction When Gambling Becomes A Problem',
      date: '20 Dec',
      image: '/post/hero.jpg',
      likes: 20000,
      comments: 40000,
      description: 'nappropriate behavior Lorem ipsum dolor sit amet, consectetur.'
   },
]

const Account = () => {
   const router = useRouter()

   const { user } = useSelector((state) => state.auth);
   const { loading, posts } = useSelector((state) => state.UAP);
   
   const dispatch = useDispatch();

   const query_id = router.query.Account;

   const [ fetchedUser, setFetchedUser ] = useState({});

   const handleRoute = (id) => {
      router.push(`/Post/[post]` ,`/Post/${id}`)
   }
   
   const [openProfile, setOpenProfile] = useState(false);

   const date_string = fetchedUser?.createdAt;
   const dt_object = new Date(date_string);
   const formatted_date = dt_object.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric"
   });

   const follow = user?.following?.map((item) => item?._id).includes(query_id);
   
   useEffect(() => {
      const fetchUserPost = async () => {
         dispatch(fetchUserAllPostStart())
         try {
            const res = await axios.get(`http://localhost:5000/api/posts/userPosts/${query_id}`);

            // console.log('res:', res.data);
            if(res.data) {
               dispatch(fetchUserAllPostSuccess(res.data.data))
            } else {
               dispatch(fetchUserAllPostFailure(res.data.message))
            }
         } catch (error) {
            console.log('error:', error.message)
         }
      }
      fetchUserPost();
   }, [dispatch, query_id])


   const handleProfile = () => {
      setOpenProfile(!openProfile)
   }


   useEffect(() => {
      const fetchUser = async () => {
         try {
            const res = await axios.get(`http://localhost:5000/api/user/getUser/${query_id}`);

            if(res.data) {
               setFetchedUser(res.data.data);
               dispatch(getLoggedUser())
            } else {
               console.log('err:', res.data.message);
            }
         }catch(err) {
            console.log('err:', err.message);
         }   
      }
      fetchUser(); 
   }, [openProfile, query_id, dispatch])

   const handleFollow = async () => {
      try {
         const res = await axios.post(`http://localhost:5000/api/user/follow/${query_id}`, {},{
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + Cookies.get("accessToken"),
              } 
          })
         console.log('res:', res.data);

         if(res.data) {
            dispatch(getLoggedUser())
         }
         
      } catch (error) {
         console.log('error:', error.message);
      }
   }


  return (
   <div className='relative'>
   <Navbar />
   <div className="w-full h-full">
      <div className="w-full bg-white px-6  grid grid-cols-1 md:grid-cols-2 py-4 sm:py-16 md:py-20">
         <div className=' flex items-center justify-center'>
         <div className='w-[12em] h-[12em] lg:w-[20em] lg:h-[20em] rounded-full  px-2 py-2 relative'>
            <Image 
               src={fetchedUser?.avatar || '/user/user.jpg'}
               alt="posts"
               width={400}
               height={400}
               className='w-full h-full object-scale-up rounded-full'
            />
         </div>
         </div>
         <div className='flex flex-col items-start my-8 justify-center'>
            <h1 className='text-2xl font-bold py-4 '>{fetchedUser?.name}</h1>
            <p className='text-gray-400'>{fetchedUser?.bio || "MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money"}</p>
            <div className='flex flex-col items-start justify-start my-4'>
               <div className='flex'>
            <p>
               <span className='text-gray-400'>Followers:</span> {fetchedUser?.followers?.length || 0}
            </p>
            <p className='mx-4'>
               <span className='text-gray-400'>Following:</span> {fetchedUser?.following?.length || 0}
            </p>
            <p>
               <span className='text-gray-400'>Posts:</span> {posts?.length || 0}
            </p>
               </div>
            <div className='my-2'>
            <p className=''>
               <span className='text-gray-400'>Joined:</span> {formatted_date || '20 Dec 2021'}
            </p>
            </div>
            </div>
            
            <div>
               {user?._id === query_id && 
               <button className='bg-gray-200 text-gray-400 px-4 py-2 rounded-full my-4' onClick={handleProfile}>Edit Profile</button>
               }
               
               {user?._id !== query_id && <button className={`${follow ? "bg-gray-800 bg-opacity-60" : "bg-sky-500"} text-white px-4 py-2 mx-2 rounded-full my-4`} onClick={handleFollow}>{follow ? "unfollow" :  "follow"}</button>}
            </div>
         </div>
      </div>

      <div className='px-6 lg:px-12 my-8 '>
      <h1 className='text-2xl font-bold '>Posts</h1>
      <div className='grid my-8 md:grid-cols-2 lg:grid-cols-3 gap-4'>
         {loading ? 
            <div>Loading...</div>
         :
         posts?.map((item, i) => ( 
         <Card key={i} onClick={() => handleRoute(item?._id)} item={item} />
         ))} 
      </div>
      </div>
   </div>
   {openProfile && 
      <div className='w-full h-screen bg-gray-800 bg-opacity-50 z-[999] fixed top-0 grid place-content-center' onClick={handleProfile}>
         <AccountProfile handleClick={handleProfile} user={fetchedUser} />
      </div>
      }
 </div>
   
  )
}

export default Account