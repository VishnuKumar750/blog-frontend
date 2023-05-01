import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AiFillDelete } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { PRODUCTION_URL } from '../../../constants'
import { useRouter } from 'next/router'

const Comments = ({ comments, handleCommData }) => {
   const [comment, setComment] = React.useState('')
   const [errors, setErrors ] = useState('')
   const [ loading, setLoading ] = useState(false)
   const [ showDelete, setShowDelete ] = useState(false)
   const [ currindex, setIndex ] = useState(null)
   const { user } = useSelector((state) => state.auth);

   // console.log(comments.comments);
   const handleSubmit = async (e) => {
      e.preventDefault()
      
      if(!user) {
         toast.error('Please login to comment')
         return ;
      }
      let error = '';

      if(!comment) {
         error = "Please enter comment then submit"; 
         setErrors(error);
         return ;
      }
      
      try {
         setLoading(true);

         const res = await axios.post(`${PRODUCTION_URL}/api/posts/comment/${comments._id}`, { "text": comment }, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': "Bearer " + Cookies.get('accessToken'),
               'cache-control': 'no-cache'
            }
         })

         if(res.data.success) {
            setComment('');
            handleCommData();
            setLoading(false);
         }
      } catch(err) {
         console.log(err);
      } finally {
         setLoading(false)
      }
   }

   const handleFocus = () => {
      setErrors('');
   }

   // format date 
   const dateGiven = (value) => {
      const date = new Date(value).toLocaleDateString();
      return date;
   }

   const handleClick = (index) => {
      setShowDelete(true);
      setIndex(index);
   }

   const handleDelete = async (id) => {
     try {
         const res = await axios.delete(`${PRODUCTION_URL}/api/posts/comment/${comments._id}?_id=${id}`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': "Bearer " + Cookies.get('accessToken'),
               'cache-control': 'no-cache'
            }})

            if(res.data.success) {
            handleCommData();
            setShowDelete(false);
            setIndex(null);
         }

   } catch(err) {
      console.log(err);
   } finally {
      setShowDelete(false);
      setIndex(null);
   }
}

const router = useRouter();

const handleRoute = (id) => {
   router.push(`/Account/${id}`)
}

  return (
    <div className='px-4 bg-white py-4 shadow-md'>
      <form className='h-full' onSubmit={handleSubmit}>
         <textarea placeholder='comments' className='bg-gray-200 outline-none text-gray-600 w-full h-[10em] overflow-hidden px-2 py-2' value={comment}
         onFocus={handleFocus}
         onChange={(e) => setComment(e.target.value)}
         />
         { errors && <p className='text-red-500 text-sm'>{errors}</p> } 
         <button type="submit" className={`my-4 px-4 bg-sky-500 ${loading ? 'cursor-wait' : 'cursor-pointer'} py-2 font-bold text-white rounded-md shadow-md`}>Submit</button>
      </form>

      {comments?.comments?.map((item, index) => (
       <div key={index} className='flex justify-between my-8 h-full border-2 relative'>
         <div className='w-[4em] h-[4em] my-8 mx-4 rounded-full'>
            <Image 
               src={item?.commentor.avatar || '/categories/technology.jpg'}
               alt="posts"
               width={400}
               height={400}
               className='w-full h-full rounded-full'
            />
         </div>
         <div className='mx-6 my-4 py-4 flex-1'>
            <div className='flex items-center justify-between'>
            <h1 className='text-xl font-bold cursor-pointer font-serif ' onClick={() => handleRoute(item?.commentor?._id)}>{item?.commentor?.name}</h1>
            {user?._id === item?.commentor?._id &&
            <AiFillDelete className='text-red-500 text-xl' onClick={() => handleClick(index)}/>
            }
            </div>
            <p className='text-gray-400 pb-2 text-sm'>{dateGiven(item?.commentor?.createdAt)}</p>
            <p className='text-gray-800 font-serif overflow-y-auto max-w-[80%] max-h-[5em]'>{item?.comm}</p>
         </div>

         {currindex === index && showDelete && 
         <div className='z-[999] absolute top-0 w-full h-full  bg-gray-800 bg-opacity-50 flex items-center justify-center'>
            <div className=''>
               <h1 className='text-white my-2 text-lg font-bold'>Are you sure you want to delete ? </h1>
               <div className='flex items-center justify-between'>
               
               <button className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md mx-4' onClick={() => handleDelete(item?._id)}>Delete</button>

               <button className='bg-red-500 text-white px-4 py-2 rounded-md shadow-md' onClick={() => setShowDelete(!showDelete)}>Cancel</button>
               </div>
            </div>   
         </div>
         }
      </div>
      ))}
    </div>
  )
}

export default Comments