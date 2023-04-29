import axios from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { FaCamera, FaEdit, FaFacebook, FaHeart, FaInstagram, FaPinterest, FaRegHeart, FaTwitter } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { PRODUCTION_URL } from '../../../constants'

const PostDetails = ({ posts, handleUpdateEffect }) => {
  const { user } = useSelector(state => state.auth)
  const [showPost, setShowUpdatePost] = React.useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const liked = posts?.post?.likes?.findIndex((like) => like?.user?._id === user?._id);

  // console.log(liked);
  // update post state
  const [postTitle, setTitle] = useState('');
  const [postContent, setContent] = useState('');
  const [preview, setPreview] = useState('');
  const [ image, setImage ] = useState(null);

  const router = useRouter()

  useEffect(() => {},[liked])


  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setImage(reader.result);
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${PRODUCTION_URL}/api/posts/delete/${posts?.post?._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('accessToken')
        }
      })
      if(res.data.success) {
        toast.success('Post Deleted Successfully')
        setTimeout(() => {
          setShowDelete(false)
          router.replace('/');
        }, 2000);
       }
    } catch(err) {

    } finally {
      setTimeout(() => {
        setShowDelete(false);
      }, 5000);
    }
  }

  function GivenDate (value) {
    const date = new Date(value).toLocaleDateString();
    return date;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = {};

    if(postTitle) form.title = postTitle;
    if(postContent) form.content = postContent;
    if(image) form.image = image;

    try {
      const res = await axios.put(`${PRODUCTION_URL}/api/posts/updatePost/${posts?.post?._id}`, form, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('accessToken')
        }})

        if(res.data.success) {
          toast.success('Post Updated Successfully')
         
          handleUpdateEffect();

          setTimeout(() => {
            setShowUpdatePost(false)
          }, 2000);
        } else {
          toast.error(res.data.message)
        }
   } catch(err) {
      console.log(err.message);
      } finally {
        setTimeout(() => {
          setShowUpdatePost(false)
        }, 5000);
      }
  }


  const handleLiked = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${PRODUCTION_URL}/api/posts/like/${posts?.post?._id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('accessToken'),
          'cache-control': 'no-cache'
        }
      })
      if(res.data.success) {
        handleUpdateEffect();
      }
    } catch(err) {

    }
  } 

  const handleDisliked = async (e) => {
    try {
      const res = await axios.post(`${PRODUCTION_URL}/api/posts/dislike/${posts?.post?._id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('accessToken'),
          'cache-control': 'no-cache'

        }
      })

      if(res.data.success) {
        handleUpdateEffect();
      }

    } catch(err) {

    }
  }

  return (
    <div className=''>
    <div className='my-8 lg:px-8 mx-4 bg-white px-4 py-4 shadow-md'>
      <div className='w-full h-[20em]'>
         <Image 
          src={posts?.post?.image || "/post/hero.jpg"}
          alt="userPost"
            width={400}
            height={400}
            className='w-full h-full'
         />
      </div>

      <div>
        <h1 className='text-2xl font-bold my-4'>{posts?.post?.title}</h1>
        { user?._id === posts?.author?._id && <div className='flex items-center justify-end my-4'>
          <FaEdit className='text-xl mx-4 text-gray-500 cursor-pointer'
          onClick={() => setShowUpdatePost(!showPost)}
          />
          <AiFillDelete className='text-xl text-gray-500 cursor-pointer' onClick={() => setShowDelete(!showDelete)}/>
        </div>}

        <div className='flex items-center justify-end'>
          <div className='mx-2 my-4'>
          <h2 className='text-end text-md text-gray-600 font-bold'>{posts?.author?.name}</h2>
          <p className='text-xs text-end text-gray-400'>{GivenDate(posts?.post?.createdAt)}</p>
          </div>
          <div className='w-[3em] h-[3em]'>
          <Link href={`/Account/${posts?.author?._id}`}>
            <Image
              src={posts?.author?.avatar || "/post/hero.jpg"}
              alt="userPost"
              width={400}
              height={400}
              className='w-full h-full rounded-full'
            />
            </Link>
          </div>
        </div>

      </div>

    {/* content */}
      <div className='my-4'>
        <p className='text-lg text-gray-700'>
          {posts?.post?.content}
        </p>
        <p className='border-l-2 px-4 my-4 border-gray-800 bg-gray-200 py-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, fugit ut. Odit ea maiores quisquam aut corporis officiis! Alias tempora earum veniam accusamus cumque assumenda iusto, animi architecto harum cupiditate atque, eaque a soluta?
        </p>
      </div>

    {/* social media or like */}
    <div className='border-t-2 border-b-2 py-2 border-gray-300'>
      <div className='flex items-center'>
        <FaHeart className={`text-lg cursor-pointer ${liked !== -1 ? "text-red-500" : "text-gray-800"}`} onClick={liked !== -1 ? handleDisliked :  handleLiked}/>
        <p className='mx-2 truncate max-w-[5em]'>{posts?.post?.likes?.length} liked</p>
      </div>
      <div className='flex items-center justify-between w-32 my-4'>
        <FaInstagram className='cursor-pointer text-lg'/>
        <FaTwitter className='cursor-pointer text-lg'/>
        <FaFacebook className='cursor-pointer text-lg'/>
        <FaPinterest className='cursor-pointer text-lg'/>
      </div>
    </div>
    </div>

    {/* delete post */}
    { showDelete && (
      <div className='bg-gray-800 bg-opacity-60 fixed w-full h-full top-0 z-[9999] flex items-center justify-center overflow-y-auto cursor-pointer'
      >
        <div className='w-[25em]  bg-white grid px-4 py-4'
        >
          <h1 className='text-xl font-bold' >Are you sure you want to delete this post?</h1>
          <div className='flex items-center justify-end my-4'>
            <button className='bg-gray-500 text-white px-4 py-2 rounded-md mx-2' onClick={() => setShowDelete(!showDelete)}
        >Cancel</button>
            <button className='bg-red-500 text-white px-4 py-2 rounded-md mx-2' onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    )}


    {/* update post */}
    { showPost && (
      <div className='bg-gray-800 bg-opacity-60 fixed w-full h-full top-0 z-[9999] flex items-center justify-center overflow-y-auto cursor-pointer'
      onClick={() => setShowUpdatePost(!showPost)}
      >
        <div className='w-[25em]  bg-white grid px-4 py-4' 
        onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleUpdate}>
          <div className='relative border-2 w-full h-[12em] '>
          <Image
            src={preview || posts?.post?.image || "/post/hero.jpg"}
            alt="userPost"
            width={400}
            height={400}
            className='w-full h-full'
          />
          
          <div className='bg-gray-800 bg-opacity-50 
          absolute w-full bottom-5 py-2 flex items-center justify-center'>
          <label htmlFor='file'>
            <FaCamera className=' text-white text-xl'/>
          </label>
          <input id="file" type='file' accept='/image' className='hidden' onChange={handleImageChange}/>
          </div>
          </div>
          <div className='my-4 '>
          <div>
            <label>Title</label>
            <input type="text" className='w-full border-2 border-gray-300 p-2 my-2' value={postTitle || posts?.post?.title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div>
            <label>Content</label>
            <textarea type="text" className='w-full border-2 border-gray-300 p-2 my-2'
            value={postContent || posts?.post?.content} onChange={(e) => setContent(e.target.value) }
            />
          </div>
          <button type='submit' className='py-2 bg-sky-500 font-bold text-white my-2 w-full '>Update</button>
          </div>
          </form>
        </div>
      </div>  
    )    
    }
    </div>
  )
}

export default PostDetails